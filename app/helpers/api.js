import axios from 'axios'
import apiClient from 'common/ApiClient'
import cookie from 'react-cookie'

export function batchRequests (requests) {
  return axios.all(requests)
}

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

export function downloadContactsWithParams (params) {
  console.debug('downloading contact')
  return apiClient.get('/v1/contacts-downloads/', {
    params: params,
  })
}

export function fetchContactsByCompanyWithParams (params) {
  console.debug('fetching contact grouped by company')
  return apiClient.get('/v1/contacts-companies/', {
    params: params,
  })
}

export function downloadCompanyContactsWithParams (params) {
  console.debug('downloading contact group by companies')
  return apiClient.get('/v1/contacts-companies-downloads/', {
    params: params,
  })
}

export function fetchContactsWithUrl (url) {
  return apiClient.get(url)
}

export function fetchCustomersWithParams (params) {
  console.debug('fetching customer')
  return apiClient.get('/v1/customers/', {
    params: params,
  })
}

export function updateCustomer (customer) {
  console.debug('updating customer')
  return apiClient.patch(`/v1/customers/${customer.id}/`, customer)
}

export function fetchProfile () {
  console.debug('fetching profile')
  return apiClient.get('/v1/customers/me/')
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

export function fetchNewsFeed () {
  console.debug('fetching news feed')
  return apiClient.get(`/v1/news-feed/`)
}

export function fetchTeamFeed () {
  console.debug('fetching team feed')
  return apiClient.get('/v1/team-events/')
}

export function fetchFeed () {
  return axios.all([fetchNewsFeed(), fetchTeamFeed()])
}
