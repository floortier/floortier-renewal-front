import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import App from './App.vue'

// 라우터
import router from '@/router'

// 스타일
import '@/assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

// 플러그인 사용
pinia.use(
  createPersistedState({
    storage: sessionStorage,
    auto: true,
  })
)

app.use(pinia)
app.use(router)

app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)

app.mount('#app')
