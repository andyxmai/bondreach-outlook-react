import apiClient from 'common/ApiClient'

export default function auth (token, email) {
  console.debug('authing with ', token, email)
  return apiClient.post('/v1/auth/outlook/', {token, email})
}

export function loginWithToken (token) {
  console.debug('logging in with token', token)
  return apiClient.post('/v1/auth/login/', {token})
}

export function verifyToken (token) {
  return apiClient.post('/v1/auth/api-token-verify/', {token})
}

export function checkIfAuthed (store) {
  return store.getState().user.isAuthed
}
