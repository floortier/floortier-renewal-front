import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import DateComponent from '@/components/DateComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

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
app.component('VueDatePicker', VueDatePicker)

app.component('FormComponent', FormComponent)
app.component('InputComponent', InputComponent)
app.component('DateComponent', DateComponent)
app.component('ButtonComponent', ButtonComponent)

app.mount('#app')
