import { camelizeKeys } from 'humps'
import { fetchContactWithParams } from 'helpers/api'
import { unauthUser } from 'redux/modules/user'

const FETCHING_CONTACT_READ = 'FETCHING_CONTACT_READ'
const FETCHING_CONTACT_READ_SUCCESS = 'FETCHING_CONTACT_READ_SUCCESS'
const FETCHING_CONTACT_READ_FAILURE = 'FETCHING_CONTACT_READ_FAILURE'

function fetchingContactRead () {
  return {
    type: FETCHING_CONTACT_READ,
  }
}

function fetchingContactReadSuccess (hasContactSaved, contactSaved) {
  return {
    type: FETCHING_CONTACT_READ_SUCCESS,
    hasContactSaved,
    contactSaved,
  }
}

function fetchingContactReadFailure (error) {
  return {
    type: FETCHING_CONTACT_READ_FAILURE,
    error,
  }
}

export function checkForContactSaved (successCB, errorCB) {
  return function (dispatch) {
    dispatch(fetchingContactRead())
    const email = Office.context.mailbox.item.from.emailAddress
    fetchContactWithParams({email})
      .then((res) => {
        if (res.data.results.length) {
          const contactSaved = camelizeKeys(res.data.results[0])
          dispatch(fetchingContactReadSuccess(true, contactSaved))
          successCB(true, contactSaved.id)
        } else {
          dispatch(fetchingContactReadSuccess(false, {}))
          successCB(false, '')
        }
      })
      .catch((err) => {
        console.warn('Error fetching email', err)
        if (err.response !== undefined && err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(fetchingContactReadFailure('Failed to get email. Please reload!'))
        errorCB()
      })
  }
}

const initialState = {
  isFetching: false,
  error: '',
  hasContactSaved: false,
  contactSaved: {},
}

export default function read (state = initialState, action) {
  switch (action.type) {
    case FETCHING_CONTACT_READ:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_CONTACT_READ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasContactSaved: action.hasContactSaved,
        contactSaved: action.contactSaved,
        error: '',
      }
    case FETCHING_CONTACT_READ_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
