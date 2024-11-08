import { RouteRecordRaw } from 'vue-router'

// views
import MainView from '@/views/main/MainView.vue'

import LoginView from '@/views/authentication/LoginView.vue'
import SigninView from '@/views/authentication/SigninView.vue'
import ProfileSave from '@/views/profile/ProfileSave.vue'

// 404
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
    meta: { requiresAuth: false },
  },
  {
    path: '/profile/save',
    name: 'ProfileSave',
    component: ProfileSave,
    meta: { requiresAuth: false },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
    meta: { requiresAuth: true },
  },
]

export default routes
