import Axios from 'axios'

const options = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

export default Axios.create(options)