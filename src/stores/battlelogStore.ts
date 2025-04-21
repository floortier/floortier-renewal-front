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
  createdBy: string
}

interface BattleInfo {
  battleDate?: string
  mapSeq?: number
  opponentSeq?: number
  win?: boolean
}

export const useBattlelogStore = defineStore('battlelogStore', () => {
  // 외부 함수
  const commonStore = useCommonStore()
  const { moveTo } = commonStore

  // state
  const battlelogs = ref<Battlelog[]>([])
  const battleInfo = ref<BattleInfo>({})

  // actions
  const fetchBattlelogs = async () => {
    try {
      const url = '/api/battlelog/list'
      const response = await api.get(url)

      battlelogs.value = response.data.responseData.battlelogList
    } catch (err) {
      console.error('Error fetching battle log:', err)
    }
  }

  const saveBattlelog = async () => {
    try {
      const url = '/api/battlelog'
      const response = await api.post(url, battleInfo.value)
      if (response.data.success) {
        fetchBattlelogs()
      }
    } catch (err) {
      console.error('Error saving battle log:', err)
    }
  }

  // getters

  return {
    battlelogs,
    battleInfo,
    fetchBattlelogs,
    saveBattlelog,
  }
})
