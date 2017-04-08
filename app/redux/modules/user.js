import auth, { loginWithToken } from 'helpers/auth'
import cookie from 'react-cookie'
import apiClient from 'common/ApiClient'
import * as analytics from 'helpers/analytics'
import { fetchProfile } from 'helpers/api'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
const SET_REDIRECT_URL = 'SET_REDIRECT_URL'
const REMOVE_REDIRECT_URL = 'REMOVE_REDIRECT_URL'
const FETCHING_PROFILE = 'FETCHING_PROFILE'
const FETCHING_PROFILE_SUCCESS = 'FETCHING_PROFILE_SUCCESS'
const FETCHING_PROFILE_FAILURE = 'FETCHING_PROFILE_FAILURE'

function authUser (id) {
  return {
    type: AUTH_USER,
    id,
  }
}

export function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error,
  }
}

export function fetchingUserSuccess () {
  return {
    type: FETCHING_USER_SUCCESS,
  }
}

function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

// This gets called each time add-in is loaded to check for logged in state
export function fetchAndLoginUser (redirectUrl) {
  // Check if the token (if there is one) is still valid.
  // Otherwise, user will get directed to the auth page.
  return function (dispatch) {
    dispatch(fetchingUser())
    // Check if the token is still valid
    const token = cookie.load('token')
    apiClient.defaults.headers.authorization = `JWT ${token}`
    amplitude.getInstance().logEvent(analytics.BR_OL_LOGIN)
    loginWithToken(token)
      .then((res) => {
        dispatch(fetchingUserSuccess())
        dispatch(setRedirectUrl(redirectUrl))
        const customerID = res.data.id
        dispatch(authUser(customerID))
        const eventProperties = { customerID }
        amplitude.getInstance().logEvent(analytics.BR_OL_LOGIN_SUCCESS, eventProperties)

      })
      .catch((err) => {
        // token has expired. Remove it and force user to auth
        cookie.remove('token', { path: '/' })
        delete apiClient.defaults.headers.authorization
        console.warn('login error', err)
        dispatch(removeFetchingUser())
        dispatch(setRedirectUrl(redirectUrl))
        dispatch(unauthUser())
        const eventProperties = { 'error': err.response }
        amplitude.getInstance().logEvent(analytics.BR_OL_LOGIN_FAILURE, eventProperties)
      })
  }
}

// This gets called when user clicks "Authenticate with Outlook" button
export function fetchAndHandleAuthedUser (token, email) {
  return function (dispatch) {
    dispatch(fetchingUser())
    // remove the old token if there's any
    cookie.remove('token', { path: '/' })
    delete apiClient.defaults.headers.authorization
    amplitude.getInstance().logEvent(analytics.BR_OL_AUTHENTICATE_CLICKED)
    auth(token, email)
      .then((res) => {
        const token = res.data.token
        cookie.save('token', token, { path: '/' })
        apiClient.defaults.headers.authorization = `JWT ${token}`
        dispatch(fetchingUserSuccess())
        const customerID = res.data.id
        dispatch(authUser(customerID))
        const eventProperties = { customerID }
        amplitude.getInstance().logEvent(analytics.BR_OL_AUTHENTICATE_SUCCESS, eventProperties)
      })
      .catch((err) => {
        console.warn('Auth err', err.response)
        dispatch(fetchingUserFailure('Failed to get user profile'))
        const eventProperties = { 'error': err.response }
        amplitude.getInstance().logEvent(analytics.BR_OL_AUTHENTICATE_FAILURE, eventProperties)
      })
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    cookie.remove('token', { path: '/' })
    delete apiClient.defaults.headers.authorization
    dispatch(unauthUser())
  }
}

export function setRedirectUrl (redirectUrl) {
  return {
    type: SET_REDIRECT_URL,
    redirectUrl,
  }
}

export function removeRedirectUrl () {
  return {
    type: REMOVE_REDIRECT_URL,
  }
}

function fetchingProfile () {
  return {
    type: FETCHING_PROFILE,
  }
}

function fetchingProfileSuccess (firstName, lastName, email, team) {
  return {
    type: FETCHING_PROFILE_SUCCESS,
    firstName,
    lastName,
    email,
    team,
  }
}

function fetchingProfileFailure (error) {
  return {
    type: FETCHING_PROFILE_FAILURE,
    error,
  }
}

export function fetchAndHandleProfile () {
  return function (dispatch) {
    dispatch(fetchingProfile())
    fetchProfile()
      .then((res) => {
        const profile = res.data
        const { team } = profile
        const { firstName, lastName, email } = profile.user
        dispatch(fetchingProfileSuccess(firstName, lastName, email, team))
      })
      .catch((err) => {
        dispatch(fetchingProfileFailure('Failed to get profile'))
      })
  }
}

const initialState = {
  isAuthed: false,
  isFetching: false,
  isFetchingProfile: false,
  error: '',
  authedId: '',
  firstName: '',
  lastName: '',
  email: '',
  team: {},
  redirectUrl: '',
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.id,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case SET_REDIRECT_URL:
      return {
        ...state,
        redirectUrl: action.redirectUrl,
      }
    case REMOVE_REDIRECT_URL:
      return {
        ...state,
        redirectUrl: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_PROFILE:
      return {
        ...state,
        isFetchingProfile: true,
      }
    case FETCHING_PROFILE_SUCCESS:
      return {
        ...state,
        isFetchingProfile: false,
        error: '',
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        team: action.team ? action.team : {},
      }
    case FETCHING_PROFILE_FAILURE:
      return {
        ...state,
        isFetchingProfile: false,
        error: action.error,
      }
    default:
      return state
  }
}
