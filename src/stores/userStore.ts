import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'
import { useAuthStore } from '@/stores/authStore'

export const useUserStore = defineStore('user', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()
  const authStore = useAuthStore()

  // init
  const initUserInfo = {
    userSeq: '',
    userId: '',
    userName: '',
    userRace: '',
    userTier: '',
  }

  // state
  const userInfo = ref({ ...initUserInfo })

  // actions
  const cleanUserInfo = () => {
    userInfo.value = { ...initUserInfo }
  }

  const saveProfile = async () => {
    const url = '/api/user/profile/save'
    const obj = {
      userSeq: authStore.userInfo.userSeq,
      userName: userInfo.value.userName,
      userRace: userInfo.value.userRace,
      userTier: userInfo.value.userTier,
    }

    const res = await api.post(url, obj)

    if (res.success) {
      moveTo('/')
    }
  }

  return {
    userInfo,
    cleanUserInfo,
    saveProfile,
  }
})
