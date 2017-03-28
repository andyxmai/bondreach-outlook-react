import axios from 'axios'
import apiClient from 'common/ApiClient'
import cookie from 'react-cookie'

export function saveContact (contact) {
  console.debug('saving contact')
  return apiClient.post('/v1/contacts/', contact)
}

export function updateContact (contact) {
  console.debug('updating contact')
  return apiClient.patch(`/v1/contacts/${contact.id}/`, contact)
}

export function fetchContactWithId (contactId) {
  console.debug('fetching contact with ID')
  return apiClient.get(`/v1/contacts/${contactId}/`)
}

export function fetchContactWithParams (params) {
  console.debug('fetching contact')
  return apiClient.get('/v1/contacts/', {
    params: params,
  })
}

export function fetchContactsWithUrl (url) {
  return apiClient.get(url)
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
  console.debug('saving followup')
  return apiClient.post('/v1/follow-ups/', params)
}

export function saveCorrespondence (params) {
  console.debug('saving correspondence')
  return apiClient.post('/v1/correspondences/', params)
}

export function fetchProfile () {
  console.debug('fetching profile')
  return apiClient.get('/v1/customers/me/')
}
