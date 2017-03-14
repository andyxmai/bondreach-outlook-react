import auth, { loginWithToken } from 'helpers/auth'
import cookie from 'react-cookie'
import apiClient from 'common/ApiClient'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
const SET_REDIRECT_URL = 'SET_REDIRECT_URL'
const REMOVE_REDIRECT_URL = 'REMOVE_REDIRECT_URL'

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
    console.log('fetching user');
    dispatch(fetchingUser())
    // Check if the token is still valid
    const token = cookie.load('token')
    apiClient.defaults.headers.authorization = `JWT ${token}`
    loginWithToken(token)
      .then((res) => {
        dispatch(fetchingUserSuccess())
        dispatch(setRedirectUrl(redirectUrl))
        dispatch(authUser(res.data.id))
      })
      .catch((err) => {
        // token has expired. Remove it and force user to auth
        cookie.remove('token', { path: '/' })
        delete apiClient.defaults.headers.authorization
        console.warn('login error', err)
        dispatch(removeFetchingUser())
        dispatch(setRedirectUrl(redirectUrl))
        dispatch(unauthUser())
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
    auth(token, email)
      .then((res) => {
        const token = res.data.token
        cookie.save('token', token, { path: '/' })
        apiClient.defaults.headers.authorization = `JWT ${token}`
        dispatch(fetchingUserSuccess())
        dispatch(authUser(res.data.id))
      })
      .catch((err) => {
        console.warn('Auth err', err.response)
        dispatch(fetchingUserFailure('Failed to get user profile'))
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

const initialState = {
  isAuthed: false,
  isFetching: false,
  error: '',
  authedId: '',
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
    default:
      return state
  }
}
