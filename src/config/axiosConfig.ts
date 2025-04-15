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
api.interceptors.response.use(
  (res) => {
    if (res.data.message) alert(res.data.message)
    return res
  },
  (err) => {
    console.error(err)
    if (err.response.data.message) {
      alert(err.response.data.message)
    } else {
      alert(err.response.data.error)
    }
    return Promise.reject(err)
  }
)

export default api
