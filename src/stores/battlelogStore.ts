import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

interface Battlelog {
  battleDate: string
  mapName: string
  winnerName: string
  winnerRace: string
  winnerTier: string
  loserName: string
  loserRace: string
  loserTier: string
  seasonName: string
  createdAt: string
  createdBy: string
}

export const useBattlelogStore = defineStore('battlelog', () => {
  // 외부 함수
  const commonStore = useCommonStore()
  const { moveTo } = commonStore

  // state
  const battlelogs = ref<Battlelog[]>([])

  // actions
  const fetchBattlelogs = async () => {
    try {
      const url = '/api/battlelog/list'
      const response = await api.get(url)
      battlelogs.value = response.data.responseData.battlelogList
      console.log(battlelogs.value)
    } catch (err) {
      console.error('Error fetching battle log:', err)
    }
  }

  // getters

  return {
    battlelogs,
    fetchBattlelogs,
  }
})
