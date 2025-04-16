import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

export const useDashboardStore = defineStore('dashboard', () => {
  // 외부 함수
  const commonStore = useCommonStore()
  const { moveTo } = commonStore

  // state
  const activedTap = ref('race')

  const tapList = ref([
    { name: '종족별 승률', value: 'race' },
    { name: '티어별 승률', value: 'tier' },
    { name: '맵별 승률', value: 'map' },
  ])

  // actions
  const activeTap = (value: string) => {
    activedTap.value = value
  }

  return {
    activedTap,
    tapList,
    activeTap,
  }
})
