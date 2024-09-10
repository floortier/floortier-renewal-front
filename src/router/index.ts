import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

// Vue Router 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
