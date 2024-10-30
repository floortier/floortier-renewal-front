import { RouteRecordRaw } from 'vue-router'

// views
import MainView from '@/views/main/MainView.vue'
import LoginView from '@/views/login/LoginView.vue'
import SigninView from '@/views/signin/SigninView.vue'

// 404
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
]

export default routes
