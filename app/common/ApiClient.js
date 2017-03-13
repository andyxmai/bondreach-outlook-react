import axios from 'axios'

var apiClient = axios.create({
  baseURL: process.env.API_HOST,
  xsrfHeaderName: "X-CSRFToken",
})

// Todo (Andy): add response interceptor to handle 403 errors

export default apiClient
