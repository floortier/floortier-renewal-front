import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

import { useAuthStore } from '@/stores/authStore'

// Vue Router 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
