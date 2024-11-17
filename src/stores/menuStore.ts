import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

import api from '@/config/axiosConfig'

interface Menu {
  menuId: number
  menuName: string
  menuPath: string
  menuIcon?: string
  upMenuId?: number
}

import { useCommonStore } from '@/stores/common/commonStore'

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

    if (res.success) {
      state.menus = res.data.menuList
      console.log(res.data.menuList)
    }
  }

  return {
    menuList,
    fetchMenus,
  }
})
