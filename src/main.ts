import { createApp } from 'vue'

import App from './App.vue'

// 라우터
import router from '@/router'

// 스타일
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
