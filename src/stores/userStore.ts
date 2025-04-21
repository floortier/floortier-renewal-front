import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/config/axiosConfig'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

interface User {
  floorUserSeq: number
  nickname: string
  userRace: string
  userTier: string
}

export const useUserStore = defineStore('userStore', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()
  const authStore = useAuthStore()

  // init
  const initUserInfo = {
    userSeq: '',
    floorUserSeq: '',
    username: '',
    nickname: '',
    userRace: '',
    userTier: '',
  }

  // state
  const userInfo = ref({ ...initUserInfo })
  const users = ref<User[]>([])

  // actions
  const cleanUserInfo = () => {
    userInfo.value = { ...initUserInfo }
  }

  const fetchUserList = async () => {
    const url = '/api/user/list'
    const res = await api.get(url)

    if (res.data.success) {
      users.value = res.data.responseData.userList
    }
  }

  return {
    userInfo,
    users,
    cleanUserInfo,
    fetchUserList,
  }
})
