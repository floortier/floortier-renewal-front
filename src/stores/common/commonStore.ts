import { defineStore } from 'pinia'

import { useRouter } from 'vue-router'

export const useCommonStore = defineStore('common', () => {
  const router = useRouter()
  // state

  // getter

  // actions
  const moveTo = (to: string) => {
    router.push(to)
  }

  return { moveTo }
})
