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

  const signin = async (username: string, password: string) => {
    const url = '/api/user/signin'
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const res = await api.post(url, formData)

    if (res.data.success) {
      userInfo.value.userSeq = res.data.responseData.userInfo.userSeq
      userInfo.value.username = res.data.responseData.userInfo.username

      isLoggedIn.value = true

      // 메인 페이지로 이동
      moveTo('/')
    }
  }

  const signout = () => {
    isLoggedIn.value = false
  }

  const signup_validate = async (
    username: string,
    password: string,
    passwordcheck: string,
    userRealName: string,
    birthday: string,
    email: string
  ) => {
    // 필드 확인
    const missingFields = []

    if (!username) missingFields.push('아이디')
    if (!password) missingFields.push('비밀번호')
    if (!passwordcheck) missingFields.push('비밀번호 확인')
    if (!userRealName) missingFields.push('이름')
    if (!birthday) missingFields.push('생년월일')
    if (!email) missingFields.push('이메일')

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해 주세요.`)
      return false
    }

    // 비밀번호 확인
    if (password != passwordcheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    }

    // 정규식 확인
    if (!signup_regex(username, password, birthday, email)) return false

    // 아이디 확인
    await duplicateExists(username)
    if (isDuplicate.value) {
      alert('이미 존재하는 사용자입니다.')
      return false
    }

    return true
  }

  const searchid_validate = async (userRealName: string, birthday: string, email: string) => {
    // 필드 확인
    const missingFields = []

    if (!userRealName) missingFields.push('이름')
    if (!birthday) missingFields.push('생년월일')
    if (!email) missingFields.push('이메일')

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해 주세요.`)
      return false
    }

    // 정규식 확인
    if (!search_regex(email)) return false

    return true
  }

  const searchpw_validate = async (username: string, userRealName: string, birthday: string, email: string) => {
    // 필드 확인
    const missingFields = []

    if (!username) missingFields.push('아이디')
    if (!userRealName) missingFields.push('이름')
    if (!birthday) missingFields.push('생년월일')
    if (!email) missingFields.push('이메일')

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해 주세요.`)
      return false
    }

    // 정규식 확인
    if (!search_regex(email)) return false

    return true
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

  const signup_regex = (username: string, password: string, birthday: string, email: string) => {
    const id_regex = /^[a-zA-Z](?=.*[a-zA-Z0-9]$)(?!.*[_-]{2})[a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s)[A-Za-z\d!@#$%^&*]{8,}$/
    const birthday_regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!id_regex.test(username)) {
      alert(
        '1. 아이디는 4~16자이며\n' +
          '2. 영문 대소문자로 시작하고\n' +
          '3. 숫자, 언더스코어(_), 하이픈(-)을 포함할 수 있습니다.'
      )
      return false
    } else if (!password_regex.test(password)) {
      alert(
        '1. 비밀번호는 최소 8자 이상이어야 합니다.\n' +
          '2. 비밀번호는 영문 대소문자, 숫자, 특수 문자를 각각 하나 이상 포함해야 합니다.\n' +
          '3. 비밀번호에 공백 문자를 포함할 수 없습니다.'
      )
      return false
    } else if (!birthday_regex.test(birthday)) {
      alert('생년월일을 형식에 맞게 작성해주세요.')
    } else if (!email_regex.test(email)) {
      alert('이메일 형식에 맞게 작성해주세요.')
      return false
    } else {
      return true
    }
  }

  const search_regex = (email: string) => {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!email_regex.test(email)) {
      alert('이메일 형식에 맞게 작성해주세요.')
      return false
    } else {
      return true
    }
  }

  const signup = async (
    username: string,
    password: string,
    passwordcheck: string,
    userRealName: string,
    birthday: string,
    email: string
  ) => {
    // 유효성
    const isValid = await signup_validate(username, password, passwordcheck, userRealName, birthday, email)
    if (!isValid) return

    // 회원가입절차
    const url = '/api/user/signup'
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('userRealName', userRealName)
    formData.append('birthday', birthday)
    formData.append('email', email)

    const res = await api.post(url, formData)

    if (res.data.success) {
      moveTo('/signin')
    }
  }

  const searchid = async (userRealName: string, birthday: string, email: string) => {
    const url = '/api/user/searchid'
    const obj = {
      userRealName,
      birthday,
      email,
    }

    const isValid = await searchid_validate(userRealName, birthday, email)
    if (!isValid) return

    const res = await api.post(url, obj)

    if (res.data.success) {
      alert(`회원님의 아이디는 ${res.data.responseData.username} 입니다.`)
      moveTo('/')
    }
  }

  const searchpw = async (username: string, userRealName: string, birthday: string, email: string) => {
    const url = '/api/user/searchpw'
    const obj = {
      username,
      userRealName,
      birthday,
      email,
    }

    const isValid = await searchpw_validate(username, userRealName, birthday, email)
    if (!isValid) return

    const res = await api.post(url, obj)

    if (res.data.success) {
      moveTo('/')
    }
  }

  return {
    isLoggedIn,
    isDuplicate,
    userInfo,
    cleanUserInfo,
    signin,
    signout,
    duplicateExists,
    signup,
    searchid,
    searchpw,
  }
})
