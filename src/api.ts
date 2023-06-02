import Axios from 'axios'

const options = {
  baseURL: 'http://192.168.1.214:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

export default Axios.create(options)
