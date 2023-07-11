import Axios from 'axios'
import router from '@/router'

const options = {
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

const instance = Axios.create(options)

instance.interceptors.response.use(
  (response) => response,
  () => {
    router.push('/error')
    return Promise.reject()
  }
)

export default instance
