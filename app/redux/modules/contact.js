import camelize from 'camelize'
import snakeCaseKeys from 'snakecase-keys'
import { fetchContactWithId, fetchContactWithParams, updateContact } from 'helpers/api'

const FETCHING_CONTACT = 'FETCHING_CONTACT'
const FETCHING_CONTACT_SUCCESS = 'FETCHING_CONTACT_SUCCESS'
const FETCHING_CONTACT_ERROR = 'FETCHING_CONTACT_ERROR'
const SHOW_VIEW_CONTACT_NOTES = 'SHOW_VIEW_CONTACT_NOTES'
const HIDE_VIEW_CONTACT_NOTES = 'HIDE_VIEW_CONTACT_NOTES'
const CHANGE_VIEW_CONTACT_NOTES = 'CHANGE_VIEW_CONTACT_NOTES'
const SAVE_VIEW_CONTACT_NOTES = 'SAVE_VIEW_CONTACT_NOTES'
const SAVE_VIEW_CONTACT_NOTES_SUCCESS = 'SAVE_VIEW_CONTACT_NOTES_SUCCESS'
const SAVE_VIEW_CONTACT_NOTES_FAILURE = 'SAVE_VIEW_CONTACT_NOTES_FAILURE'

function fetchingContact () {
  return {
    type: FETCHING_CONTACT
  }
}

function fetchingContactSuccess (contact) {
  return {
    type: FETCHING_CONTACT_SUCCESS,
    contact,
  }
}

function fetchingContactError (error) {
  return {
    type: FETCHING_CONTACT_ERROR,
    error,
  }
}

export function fetchAndHandleContactWithId (contactId) {
  return function (dispatch) {
    fetchContactWithId(contactId)
      .then((res) => {
        const contact = camelize(res.data)
        dispatch(fetchingContactSuccess(contact))
      })
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingContactError('Failed to get contact'))
      })
  }
}

// Note (Andy): This function is for searching contacts
export function fetchAndStoreContact (params) {
  const snakeCaseParams = snakeCaseKeys(params)
  return function (dispatch, getState) {
    dispatch(fetchingContact())
    fetchContactWithParams(snakeCaseParams)
      .then((response) => {
        const contact = camelize(response.data[0])
        dispatch(fetchingContactSuccess(contact))
      })
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingContactError('Failed to get contact'))
      })
  }
}

export function showNotes () {
  return {
    type: SHOW_VIEW_CONTACT_NOTES,
  }
}

export function hideNotes () {
  return {
    type: HIDE_VIEW_CONTACT_NOTES,
  }
}

export function handleNotesChanged (value) {
  return {
    type: CHANGE_VIEW_CONTACT_NOTES,
    value,
  }
}

function savingNotes () {
  return {
    type: SAVE_VIEW_CONTACT_NOTES,
  }
}

function savingNotesSuccess (notesSavedSuccessMsg) {
  return {
    type: SAVE_VIEW_CONTACT_NOTES_SUCCESS,
    notesSavedSuccessMsg,
  }
}

function savingNotesFailure (notesSavedErrorMsg) {
  return {
    type: SAVE_VIEW_CONTACT_NOTES_FAILURE,
    notesSavedErrorMsg,
  }
}

export function saveNotes () {
  return function (dispatch, getState) {
    dispatch(savingNotes())
    const contact = snakeCaseKeys(getState().contact)
    updateContact(contact)
      .then((res) => {
        dispatch(savingNotesSuccess('Notes saved'))
      })
      .catch((err) => {
        console.warn(err)
        if (err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(savingNotesFailure('Could not save notes. Try again!'))
      })
  }
}

const initialState = {
  isFetching: true,
  error: '',
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  investmentTypePreferences: [],
  minimumInvestmentSize: 0,
  maximumInvestmentSize: 100,
  regionPreferences: [],
  upcomingFollowUp: '',
  notes: '',
  isNotesPanelOpened: false,
  isSavingNotes: false,
  notesSavedSuccessMsg: '',
  notesSavedErrorMsg: '',
}

export default function contact (state = initialState, action) {
  switch (action.type) {
    case FETCHING_CONTACT:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_CONTACT_SUCCESS:
      return {
        ...state,
        ...action.contact,
        isFetching: false,
        error: '',
      }
    case FETCHING_CONTACT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SHOW_VIEW_CONTACT_NOTES:
      return {
        ...state,
        isNotesPanelOpened: true,
      }
    case HIDE_VIEW_CONTACT_NOTES:
      return {
        ...state,
        isNotesPanelOpened: false,
      }
    case CHANGE_VIEW_CONTACT_NOTES:
      return {
        ...state,
        notes: action.value,
      }
    case SAVE_VIEW_CONTACT_NOTES:
       return {
         ...state,
         isSavingNotes: true,
       }
    case SAVE_VIEW_CONTACT_NOTES_SUCCESS:
      return {
        ...state,
        notesSavedSuccessMsg: action.notesSavedSuccessMsg,
        notesSavedErrorMsg: '',
        isSavingNotes: false,
      }
    case SAVE_VIEW_CONTACT_NOTES_FAILURE:
      return {
        ...state,
        notesSavedErrorMsg: action.notesSavedErrorMsg,
        notesSavedSuccessMsg: '',
        isSavingNotes: false,
      }
    default:
      return state
  }
}
