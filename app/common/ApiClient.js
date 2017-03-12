import axios from 'axios'

var baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.bondreach.com'
} else {
  baseURL = 'https://localhost:8000'
}

var apiClient = axios.create({
  baseURL: baseURL,
  xsrfHeaderName: "X-CSRFToken",
})

// Todo (Andy): add response interceptor to handle 403 errors

export default apiClient
