import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:80',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터

// 응답 인터셉터

export default api
