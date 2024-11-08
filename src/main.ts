import { createApp } from 'vue'
import { createPinia } from 'pinia'

import SwiperClass, { Pagination } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css'

import App from './App.vue'

// 라우터
import router from '@/router'

// 스타일
import '@/assets/styles/main.scss'

SwiperClass.use([Pagination])

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueAwesomeSwiper)

app.mount('#app')
