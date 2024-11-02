import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

export const useAuthStore = defineStore('auth', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()

  // init
  const initUserInfo = {
    // TODO: 한글 아이디 사용 불가 처리 필요
    userId: '',
    userName: '',
    // TODO: 비밀번호 정규화 필요
    password: '',
    passwordcheck: '',
  }

  // state
  const isLoggedIn = ref(false)
  const isDuplicate = ref(false)
  const userInfo = ref({ ...initUserInfo })

  // getter
  const passwordSync = computed(() => {
    return userInfo.value.password == userInfo.value.passwordcheck
      ? true
      : false
  })

  // actions
  const clearUserInfo = () => {
    userInfo.value = initUserInfo
  }

  const login = async () => {
    const url = '/api/auth/login'
    const obj = {
      userId: userInfo.value.userId,
      password: userInfo.value.password,
    }

    try {
      const res = await api.post(url, obj)
      if (res.data.success) {
        isLoggedIn.value = true
        // 메인 페이지로 이동
        moveTo('/')
      } else {
        alert('로그인에 실패하였습니다.')
        isLoggedIn.value = false
      }
    } catch (err) {
      console.error(err)
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

    return true
  }

  const duplicateExists = async () => {
    const url = `/api/auth/isDuplicate`
    const obj = {
      userId: userInfo.value.userId,
    }

    try {
      await api.post(url, obj).then((res) => {
        if (res.data.userCnt > 0) isDuplicate.value = true
        else isDuplicate.value = false
      })
    } catch (err) {
      console.error(err)
    }
  }

  const signin = async () => {
    // 유효성
    const isValid = await validate()
    if (!isValid) return

    // 회원가입절차
    const url = '/api/auth/signin'
    const obj = {
      userId: userInfo.value.userId,
      password: userInfo.value.password,
    }

    try {
      const res = await api.post(url, obj)
      if (res.data.success) {
        alert('회원가입이 완료되었습니다.')
        // 데이터 비우기
        clearUserInfo()
        // 로그인 페이지로 이동
        moveTo('/login')
      } else {
        alert('회원가입에 실패하였습니다.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    isLoggedIn,
    isDuplicate,
    userInfo,
    passwordSync,
    login,
    logout,
    duplicateExists,
    signin,
  }
})
