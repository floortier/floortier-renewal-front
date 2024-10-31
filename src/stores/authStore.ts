import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import api from '@/config/axiosConfig'

export const useAuthStore = defineStore('auth', () => {
  // state
  const isLoggedIn = ref(false)

  // getter

  // actions
  const login = () => {
    isLoggedIn.value = true
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  const checkDuplicate = async () => {
    const url = `/api/auth/checkDuplicate`

    const res = api.post(url)
  }

  const signin = () => {
    checkDuplicate()
  }

  return { isLoggedIn, login, logout, checkDuplicate, signin }
})
