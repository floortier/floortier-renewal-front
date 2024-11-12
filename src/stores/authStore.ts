import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

export const useAuthStore = defineStore('auth', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()

  // init
  const initUserInfo = {
    userSeq: '',
    userId: '',
    password: '',
    passwordcheck: '',
  }

  // state
  const isLoggedIn = ref(false)
  const isDuplicate = ref(false)
  const userInfo = ref({ ...initUserInfo })

  // getter
  const passwordSync = computed(() => {
    return userInfo.value.password == userInfo.value.passwordcheck ? true : false
  })

  // actions
  const cleanUserInfo = () => {
    userInfo.value = { ...initUserInfo }
  }

  const login = async () => {
    const url = '/api/user/login'
    const obj = {
      userId: userInfo.value.userId,
      password: userInfo.value.password,
    }

    const res = await api.post(url, obj)

    if (res.success) {
      userInfo.value.userSeq = res.data.userInfo.userSeq
      if (res.data.returnURL) {
        moveTo(res.data.returnURL)
        return
      }
      isLoggedIn.value = true
      // 메인 페이지로 이동
      moveTo('/')
    }
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  const validate = async () => {
    // 필드 확인
    const missingFields = []

    if (!userInfo.value.userId) missingFields.push('아이디')
    if (!userInfo.value.password) missingFields.push('비밀번호')
    if (!userInfo.value.passwordcheck) missingFields.push('비밀번호 확인')

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해 주세요.`)
      return false
    }

    // 비밀번호 확인
    if (!passwordSync.value) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    }

    // 아이디 확인
    await duplicateExists()
    if (isDuplicate.value) {
      alert('이미 존재하는 사용자입니다.')
      return false
    }

    // 정규식 확인
    if (!scanRegex()) return false

    return true
  }

  const duplicateExists = async () => {
    const url = `/api/user/isDuplicate`
    const obj = {
      params: {
        userId: userInfo.value.userId,
      },
    }

    const res = await api.get(url, obj)

    if (res.data.cnt > 0) isDuplicate.value = true
    else isDuplicate.value = false
  }

  const scanRegex = () => {
    const id_regex = /^[a-zA-Z](?=.*[a-zA-Z0-9]$)(?!.*[_-]{2})[a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s)[A-Za-z\d!@#$%^&*]{8,}$/

    if (!id_regex.test(userInfo.value.userId)) {
      alert(
        '1. 아이디는 4~16자이며\n' +
          '2. 영문 대소문자로 시작하고\n' +
          '3. 숫자, 언더스코어(_), 하이픈(-)을 포함할 수 있습니다.'
      )
      return false
    } else if (!password_regex.test(userInfo.value.password)) {
      alert(
        '1. 비밀번호는 최소 8자 이상이어야 합니다.\n' +
          '2. 비밀번호는 영문 대소문자, 숫자, 특수 문자를 각각 하나 이상 포함해야 합니다.\n' +
          '3. 비밀번호에 공백 문자를 포함할 수 없습니다.'
      )
      return false
    } else {
      return true
    }
  }

  const signin = async () => {
    // 유효성
    const isValid = await validate()
    if (!isValid) return

    // 회원가입절차
    const url = '/api/user/signin'
    const obj = {
      userId: userInfo.value.userId,
      password: userInfo.value.password,
    }

    const res = await api.post(url, obj)

    if (res.success) {
      moveTo('/login')
    }
  }

  return {
    isLoggedIn,
    isDuplicate,
    userInfo,
    passwordSync,
    cleanUserInfo,
    scanRegex,
    login,
    logout,
    duplicateExists,
    signin,
  }
})
