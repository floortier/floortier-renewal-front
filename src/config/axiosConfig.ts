import axios from 'axios'

const API_SERVER = import.meta.env.VITE_API_SERVER

const api = axios.create({
  baseURL: `${API_SERVER}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터

// 응답 인터셉터

export default api
