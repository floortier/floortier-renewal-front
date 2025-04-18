import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/config/axiosConfig'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

export const useUserStore = defineStore('user', () => {
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

  // actions
  const cleanUserInfo = () => {
    userInfo.value = { ...initUserInfo }
  }

  const getUserList = async () => {
    const url = '/api/user/list'
    const res = await api.get(url)

    if (res.data.success) {
      userInfo.value = res.data.responseData.userList
    }
  }

  return {
    userInfo,
    cleanUserInfo,
    getUserList,
  }
})
