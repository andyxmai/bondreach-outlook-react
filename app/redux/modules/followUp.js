import snakeCaseKeys from 'snakecase-keys'
import { saveFollowUp } from 'helpers/api'
import { formatJSDateToPyDate } from 'helpers/utils'
import { unauthUser } from 'redux/modules/user'

const ADD_FOLLOW_UP_CONTACT_ID = 'ADD_FOLLOW_UP_CONTACT_ID'
const ADDING_FOLLOW_UP = 'ADDING_FOLLOWUP'
const ADD_FOLLOW_UP_SUCCESS = 'ADD_FOLLOWUP_SUCCESS'
const ADD_FOLLOW_UP_FAILURE = 'ADD_FOLLOWUP_FAILURE'
const CHANGE_FOLLOW_UP_BEGIN_DATE = 'CHANGE_FOLLOWUP_BEGIN_DATE'
const CHANGE_FOLLOW_UP_FREQUENCY = 'CHANGE_FOLLOWUP_FREQUENCY'
const RESET_FOLLOW_UP = 'RESET_FOLLOW_UP'

function addingFollowUp () {
  return {
    type: ADDING_FOLLOW_UP,
  }
}

function addFollowUpSuccess () {
  return {
    type: ADD_FOLLOW_UP_SUCCESS,
  }
}

function addFollowUpError (error) {
  return {
    type: ADD_FOLLOW_UP_FAILURE,
    error,
  }
}

export function addAndHandleFollowUp () {
  return function (dispatch, getState) {
    const params = snakeCaseKeys(getState().followUp)
    dispatch(addingFollowUp())
    saveFollowUp(params)
      .then((res) => {
        dispatch(addFollowUpSuccess())
      })
      .catch((err) => {
        console.warn(err)
        if (err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(addFollowUpError('Failed to add follow up. Please try again!'))
      })
  }
}

export function addFollowUpContactId (id) {
  return {
    type: ADD_FOLLOW_UP_CONTACT_ID,
    id,
  }
}

function changeFollowUpBeginDate (beginDate, beginDataObj) {
  return {
    type: CHANGE_FOLLOW_UP_BEGIN_DATE,
    beginDate,
    beginDataObj,
  }
}

export function handleBeginDateChange (date) {
  return function (dispatch) {
    const beginDate = formatJSDateToPyDate(date)
    dispatch(changeFollowUpBeginDate(beginDate, date))
  }
}

export function changeFollowUpFrequency (frequency) {
  return {
    type: CHANGE_FOLLOW_UP_FREQUENCY,
    frequency,
  }
}

export function resetFollowUp () {
  return {
    type: RESET_FOLLOW_UP,
  }
}

const initialState = {
  isFetching: false,
  error: '',
  beginDate: '',
  beginDataObj: '',
  frequency: '',
  isActive: true,
  contact: '',  // this is actually the ID
  followUpAdded: false,
}

export default function followUp (state = initialState, action) {
  switch (action.type) {
    case ADD_FOLLOW_UP_CONTACT_ID:
      return {
        ...state,
        contact: action.id,
      }
    case ADDING_FOLLOW_UP:
      return {
        ...state,
        isFetching: true,
      }
    case ADD_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        followUpAdded: true,
      }
    case ADD_FOLLOW_UP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        followUpAdded: false,
      }
    case CHANGE_FOLLOW_UP_FREQUENCY:
      return {
        ...state,
        frequency: action.frequency,
      }
    case CHANGE_FOLLOW_UP_BEGIN_DATE:
      return {
        ...state,
        beginDate: action.beginDate,
        beginDataObj: action.beginDataObj,
      }
    case RESET_FOLLOW_UP:
      return initialState
    default:
      return state
  }
}
