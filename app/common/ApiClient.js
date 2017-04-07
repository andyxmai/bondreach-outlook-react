import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

var apiClient = axios.create({
  baseURL: process.env.API_HOST,
  xsrfHeaderName: "X-CSRFToken",
})

// Todo (Andy): add response interceptor to handle 403 errors
apiClient.interceptors.request.use((config) => {
  config.data = decamelizeKeys(config.data)
  config.params = decamelizeKeys(config.params)
  console.log(config);
  return config
}, (err) => {
  console.log(err);
  return Promise.reject(err)
})

apiClient.interceptors.response.use((res) => {
  res.data = camelizeKeys(res.data)
  return res
}, (err) => {
  return Promise.reject(err)
})

export default apiClient
