import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

import api from '@/config/axiosConfig'

import { useCommonStore } from '@/stores/common/commonStore'

interface Menu {
  menuId: number
  menuName: string
  menuPath: string
  menuIcon?: string
  upMenuId?: number
}

export const useMenuStore = defineStore('menu', () => {
  // 외부 함수
  const { moveTo } = useCommonStore()

  // state
  const state = reactive({
    menus: [] as Menu[],
  })

  // getter
  const menuList = computed(() => {
    return state.menus
  })

  // actions
  const fetchMenus = async () => {
    const url = '/api/menu/list'
    const res = await api.get(url)

    if (res.data.success) {
      state.menus = res.data.responseData.menuList
    }
  }

  return {
    menuList,
    fetchMenus,
  }
})
