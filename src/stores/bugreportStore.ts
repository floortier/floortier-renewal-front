import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

interface Bugreport {
  bugreportSeq: number
  bugreportTitle: string
  bugreportContent: string
  bugreportWriter: string
  createdAt: string
}

export const useBugreportStore = defineStore('bugreportStore', () => {
  // 외부 함수
  const commonStore = useCommonStore()
  const { moveTo } = commonStore

  // state
  const bugreports = ref<Bugreport[]>([])

  // actions
  const fetchBugreports = async () => {
    try {
      const url = '/api/bugreport/list'
      const response = await api.get(url)

      bugreports.value = response.data.responseData.bugreportList
    } catch (err) {
      console.error('Error fetching bug reports:', err)
    }
  }

  return {
    bugreports,
    fetchBugreports,
  }
})
