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

  const saveProfile = async () => {
    const url = '/api/user/profile/save'
    const obj = {
      userSeq: authStore.userInfo.userSeq,
      username: userInfo.value.username,
      userRace: userInfo.value.userRace,
      userTier: userInfo.value.userTier,
    }

    const res = await api.post(url, obj)

    if (res.data.success) {
      moveTo('/')
    }
  }

  return {
    userInfo,
    cleanUserInfo,
    saveProfile,
  }
})
