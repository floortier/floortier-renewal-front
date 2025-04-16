import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

// Vue Router 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const { isLoggedIn } = storeToRefs(authStore)
  const { checkSession } = authStore

  if (isLoggedIn.value) {
    await checkSession()
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'signin' })
  } else {
    next()
  }
})

export default router
