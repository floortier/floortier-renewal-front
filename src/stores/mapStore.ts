import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

interface Map {
  mapSeq: number
  name: string
  keyword: string
  imageUrl: string
}

export const useMapStore = defineStore('mapStore', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()

  // state
  const maps = ref<Map[]>([])

  // actions
  const fetchMapList = async () => {
    const url = '/api/map/list'
    const res = await api.get(url)

    if (res.data.success) {
      maps.value = res.data.responseData.mapList
    }
  }

  return {
    maps,
    fetchMapList,
  }
})
