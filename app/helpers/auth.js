import apiClient from 'common/ApiClient'

export default function auth (token, email, firstName, lastName) {
  console.debug('authing with ', email)
  return apiClient.post('/v1/auth/outlook/', {token, email, firstName, lastName})
}

export function loginWithToken (token) {
  console.debug('logging in with token')
  return apiClient.post('/v1/auth/login/', {token})
}

export function verifyToken (token) {
  return apiClient.post('/v1/auth/api-token-verify/', {token})
}

export function checkIfAuthed (store) {
  return store.getState().user.isAuthed
}
