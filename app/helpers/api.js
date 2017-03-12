import axios from 'axios'
import apiClient from 'common/ApiClient'
import cookie from 'react-cookie'
import snakeCaseKeys from 'snakecase-keys'

const token = cookie.load('token') ? cookie.load('token') : ''
apiClient.defaults.headers.authorization = `JWT ${token}`

export function saveContact (contact) {
  const snakeCaseContact = snakeCaseKeys(contact)
  console.debug('saving', snakeCaseContact)
  return apiClient.post('/v1/contacts/', snakeCaseContact)
}

export function updateContact (contact) {
  console.debug('updating contact', contact)
  return apiClient.patch(`/v1/contacts/${contact.id}/`, contact)
}

export function fetchContactWithId (contactId) {
  console.debug('fetching contact with ID', contactId)
  return apiClient.get(`/v1/contacts/${contactId}/`)
}

export function fetchContactWithParams (params) {
  console.debug('fetching contact', params)
  return apiClient.get('/v1/contacts/', {
    params: params,
  })
}

export function fetchRegions () {
  console.debug('fetching regions')
  return apiClient.get('/v1/regions/')
}

export function fetchInvestmentTypes () {
  console.debug('fetching investment types')
  return apiClient.get('/v1/investment-types/')
}

export function fetchRegionAndInvestmentTypes () {
  return axios.all([fetchRegions(), fetchInvestmentTypes()])
}

export function saveFollowUp (params) {
  console.debug('saving followup', params)
  return apiClient.post('/v1/follow-ups/', params)
}
