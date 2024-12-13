import { RouteRecordRaw } from 'vue-router'

// views
import MainView from '@/views/main/MainView.vue'

import SigninView from '@/views/authentication/SigninView.vue'
import SignupView from '@/views/authentication/SignupView.vue'

import SearchidView from '@/views/authentication/SearchidView.vue'
import SearchpwView from '@/views/authentication/SearchpwView.vue'

// main
import DashboardView from '@/views/dashboard/DashboardView.vue'

// 404
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: { requiresAuth: false },
  },
  {
    path: '/searchid',
    name: 'Searchid',
    component: SearchidView,
    meta: { requiresAuth: false },
  },
  {
    path: '/searchpw',
    name: 'Searchpw',
    component: SearchpwView,
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
