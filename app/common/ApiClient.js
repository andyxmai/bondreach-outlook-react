import axios from 'axios'

const DEV = true
var baseURL = ''
if (DEV) {
  baseURL = 'https://localhost:8000'
} else {
  baseURL = 'https://api.bondreach.com'
}

var apiClient = axios.create({
  baseURL: baseURL,
  xsrfHeaderName: "X-CSRFToken",
})

export default apiClient
