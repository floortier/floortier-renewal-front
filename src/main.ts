import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// 라우터
import router from '@/router'

// 스타일
import '@/assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
