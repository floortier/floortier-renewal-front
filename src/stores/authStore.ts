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
    username: '',
  }

  // state
  const isLoggedIn = ref(false)
  const isDuplicate = ref(false)
  const userInfo = ref({ ...initUserInfo })

  // actions
  const cleanUserInfo = () => {
    userInfo.value = { ...initUserInfo }
  }

  // 비밀번호 확인
  const checkpw = (password: string, passwordcheck: string) => {
    if (password != passwordcheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    }
    return true
  }

  // 필드 확인
  const checkfield = (...args: [string, any][]) => {
    const missingFields: string[] = []

    args.forEach(([fieldName, value]) => {
      if (!value) {
        missingFields.push(fieldName)
      }
    })

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해 주세요.`)
      return false
    }

    return true
  }

  // 정규식 확인
  const checkregex = (...args: [string, any][]) => {
    const id_regex = /^[a-zA-Z](?=.*[a-zA-Z0-9]$)(?!.*[_-]{2})[a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s)[A-Za-z\d!@#$%^&*]{8,}$/
    const birthday_regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    for (const [fieldName, value] of args) {
      let regex
      let errorMessage = ''

      switch (fieldName) {
        case '아이디':
          regex = id_regex
          errorMessage =
            '1. 아이디는 4~16자이며\n' +
            '2. 영문 대소문자로 시작하고\n' +
            '3. 숫자, 언더스코어(_), 하이픈(-)을 포함할 수 있습니다.'
          break
        case '비밀번호':
          regex = password_regex
          errorMessage =
            '1. 비밀번호는 최소 8자 이상이어야 합니다.\n' +
            '2. 비밀번호는 영문 대소문자, 숫자, 특수 문자를 각각 하나 이상 포함해야 합니다.\n' +
            '3. 비밀번호에 공백 문자를 포함할 수 없습니다.'
          break
        case '생년월일':
          regex = birthday_regex
          errorMessage = '생년월일을 형식에 맞게 작성해주세요.'
          break
        default:
          continue
      }

      if (!regex.test(value)) {
        alert(errorMessage)
        return false
      }
    }

    return true
  }

  const signin = async (username: string, password: string) => {
    const url = '/api/user/signin'
    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }

    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const res = await api.post(url, params, config)

    if (res.data.success) {
      userInfo.value.userSeq = res.data.responseData.userInfo.userSeq
      userInfo.value.username = res.data.responseData.userInfo.username

      isLoggedIn.value = true

      // 메인 페이지로 이동
      moveTo('/')
    }
  }

  const checkSession = async () => {
    const url = '/api/user/check'
    const config = { withCredentials: true }

    try {
      const res = await api.get(url, config)

      if (res.data.success) {
        isLoggedIn.value = true
        userInfo.value.userSeq = res.data.responseData.userSeq
        userInfo.value.username = res.data.responseData.username
      } else {
        isLoggedIn.value = false
        cleanUserInfo()
      }
    } catch (err) {
      console.error('Error checking connection:', err)
      isLoggedIn.value = false
      cleanUserInfo()
    }
  }

  const signout = () => {
    isLoggedIn.value = false
    cleanUserInfo()
  }

  const duplicateExists = async (username: string) => {
    const url = `/api/user/isDuplicate`
    const obj = {
      params: {
        username,
      },
    }

    const res = await api.get(url, obj)

    if (res.data.responseData.cnt > 0) isDuplicate.value = true
    else isDuplicate.value = false
  }

  const signup = async (
    username: string,
    password: string,
    passwordcheck: string,
    userRealName: string,
    birthday: string
  ) => {
    // 필드 확인
    if (
      !checkfield(
        ['아이디', username],
        ['비밀번호', password],
        ['비밀번호 확인', passwordcheck],
        ['이름', userRealName],
        ['생년월일', birthday]
      )
    ) {
      return false
    }

    // 비밀번호 확인
    if (!checkpw(password, passwordcheck)) return false

    // 정규식 확인
    if (!checkregex(['아이디', username], ['비밀번호', password], ['생년월일', birthday])) {
      return false
    }

    // 아이디 확인
    if (isDuplicate.value) {
      alert('이미 존재하는 사용자입니다.')
      return false
    }

    // 회원가입절차
    const url = '/api/user/signup'
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('userRealName', userRealName)
    formData.append('birthday', birthday)

    const res = await api.post(url, formData)

    if (res.data.success) {
      moveTo('/signin')
    }
  }

  const searchid = async (userRealName: string, birthday: string) => {
    const url = '/api/user/searchid'
    const obj = {
      userRealName,
      birthday,
    }

    // 필드 확인
    if (!checkfield(['이름', userRealName], ['생년월일', birthday])) {
      return false
    }

    const res = await api.post(url, obj)

    if (res.data.success) {
      alert(`회원님의 아이디는 ${res.data.responseData.username} 입니다.`)
      moveTo('/')
    }
  }

  const searchpw = async (username: string, userRealName: string, birthday: string) => {
    const url = '/api/user/searchpw'
    const obj = {
      username,
      userRealName,
      birthday,
    }

    // 필드 확인
    if (!checkfield(['아이디', username], ['이름', userRealName], ['생년월일', birthday])) {
      return false
    }

    const res = await api.post(url, obj)

    if (res.data.success) {
      userInfo.value.username = res.data.responseData.username
      moveTo('/changepw')
    }
  }

  const changepw = async (password: string, passwordcheck: string) => {
    // 필드 확인
    if (!checkfield(['비밀번호', password], ['비밀번호 확인', passwordcheck])) {
      return false
    }

    // 비밀번호 확인
    if (!checkpw(password, passwordcheck)) return false

    // 정규식 확인
    if (!checkregex(['비밀번호', password])) {
      return false
    }

    // 비밀번호 변경
    const url = '/api/user/changepw'
    const obj = {
      username: userInfo.value.username,
      password,
    }

    const res = await api.post(url, obj)

    if (res.data.success) {
      moveTo('/signin')
    }
  }

  return {
    isLoggedIn,
    isDuplicate,
    userInfo,
    cleanUserInfo,
    signin,
    checkSession,
    signout,
    duplicateExists,
    signup,
    searchid,
    searchpw,
    changepw,
  }
})
