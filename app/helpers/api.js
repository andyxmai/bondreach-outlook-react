import { ref } from 'config/constants'
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

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise,
  }
}

function saveToUserDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUserDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCB) {
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a,b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)  // this will delete it from firebase
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (duckId, reply) {
  const replyId = ref.child(`replies/${duckId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${duckId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}

export function fetchReplies (duckId) {
  return ref.child(`replies/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
