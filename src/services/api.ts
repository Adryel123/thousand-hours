import axios from 'axios'

const api = axios.create({
  baseURL: 'http://thousandhours.pythonanywhere.com'
})

export default api