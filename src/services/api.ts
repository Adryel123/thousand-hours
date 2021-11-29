import axios from 'axios'

const api = axios.create({
  baseURL: 'https://thousandhours.pythonanywhere.com'
})

export default api