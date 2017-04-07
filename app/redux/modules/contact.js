import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { fetchRegionAndInvestmentTypes, fetchContactWithId, fetchContactWithParams, updateContact, saveCorrespondence } from 'helpers/api'
import { formatFromSelectionOptions, formatToMultiSelectOptions } from 'helpers/utils'
import { maxInvestmentSizePreference, maxIrrReturn, investmentSizeTypeEquity } from 'config/constants'
import { unauthUser } from 'redux/modules/user'
import * as analytics from 'helpers/analytics'

const FETCHING_CONTACT = 'FETCHING_CONTACT'
const FETCHING_CONTACT_SUCCESS = 'FETCHING_CONTACT_SUCCESS'
const FETCHING_CONTACT_ERROR = 'FETCHING_CONTACT_ERROR'
const SHOW_VIEW_CONTACT_NOTES = 'SHOW_VIEW_CONTACT_NOTES'
const HIDE_VIEW_CONTACT_NOTES = 'HIDE_VIEW_CONTACT_NOTES'
const CHANGE_VIEW_CONTACT_NOTES = 'CHANGE_VIEW_CONTACT_NOTES'
const SAVE_VIEW_CONTACT_NOTES = 'SAVE_VIEW_CONTACT_NOTES'
const SAVE_VIEW_CONTACT_NOTES_SUCCESS = 'SAVE_VIEW_CONTACT_NOTES_SUCCESS'
const SAVE_VIEW_CONTACT_NOTES_FAILURE = 'SAVE_VIEW_CONTACT_NOTES_FAILURE'
const EDIT_CONTACT_CHANGE_FIRST_NAME = 'EDIT_CONTACT_CHANGE_FIRST_NAME'
const EDIT_CONTACT_CHANGE_LAST_NAME = 'EDIT_CONTACT_CHANGE_LAST_NAME'
const EDIT_CONTACT_CHANGE_EMAIL = 'EDIT_CONTACT_CHANGE_EMAIL'
const EDIT_CONTACT_CHANGE_PHONE = 'EDIT_CONTACT_CHANGE_PHONE'
const EDIT_CONTACT_CHANGE_COMPANY = 'EDIT_CONTACT_CHANGE_COMPANY'
const EDIT_CONTACT_CHANGE_TYPE_PREFERENCE = 'EDIT_CONTACT_CHANGE_TYPE_PREFERENCE'
const EDIT_CONTACT_CHANGE_MIN_SIZE_PREFERENCE = 'EDIT_CONTACT_CHANGE_MIN_SIZE_PREFERENCE'
const EDIT_CONTACT_CHANGE_MAX_SIZE_PREFERENCE = 'EDIT_CONTACT_CHANGE_MAX_SIZE_PREFERENCE'
const EDIT_CONTACT_CHANGE_SIZE_TYPE_PREFERENCE = 'EDIT_CONTACT_CHANGE_SIZE_TYPE_PREFERENCE'
const EDIT_CONTACT_CHANGE_MIN_IRR_PREFERENCE = 'EDIT_CONTACT_CHANGE_MIN_IRR_PREFERENCE'
const EDIT_CONTACT_CHANGE_MAX_IRR_PREFERENCE = 'EDIT_CONTACT_CHANGE_MAX_IRR_PREFERENCE'
const EDIT_CONTACT_CHANGE_REGION_PREFERENCE = 'EDIT_CONTACT_CHANGE_REGION_PREFERENCE'
const EDIT_CONTACT_CONVERT_EDIT_CONTACT_OPTIONS = 'EDIT_CONTACT_CONVERT_EDIT_CONTACT_OPTIONS'
const EDIT_CONTACT_UPDATING_CONTACT = 'EDIT_CONTACT_UPDATING_CONTACT'
const EDIT_CONTACT_UPDATE_CONTACT_SUCCESS = 'EDIT_CONTACT_UPDATE_CONTACT_SUCCESS'
const EDIT_CONTACT_REMOVE_EDIT_CONTACT_ERROR_MSG = 'EDIT_CONTACT_REMOVE_EDIT_CONTACT_ERROR_MSG'
const EDIT_CONTACT_UPDATE_CONTACT_FAILURE = 'EDIT_CONTACT_UPDATE_CONTACT_FAILURE'
const FETCH_EDIT_CONTACT_SELECT_OPTIONS = 'FETCH_EDIT_CONTACT_SELECT_OPTIONS'
const FETCH_EDIT_CONTACT_SELECT_OPTIONS_SUCCESS = 'FETCH_EDIT_CONTACT_SELECT_OPTIONS_SUCCESS'
const FETCH_EDIT_CONTACT_SELECT_OPTIONS_FAILURE = 'FETCH_EDIT_CONTACT_SELECT_OPTIONS_FAILURE'
const ADD_CORRESPONDENCE_SUCCESS = 'ADD_CORRESPONDENCE_SUCCESS'
const ADD_CORRESPONDENCE_FAILURE = 'ADD_CORRESPONDENCE_FAILURE'
const CHANGE_OUTLOOK_CONTACT_FLAG = 'CHANGE_OUTLOOK_CONTACT_FLAG'

function fetchingContact () {
  return {
    type: FETCHING_CONTACT,
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

function fetchingSelectOptions () {
  return {
    type: FETCH_EDIT_CONTACT_SELECT_OPTIONS,
  }
}

function fetchSelectOptionsSuccess (regionPreferenceOptions, investmentTypePreferenceOptions) {
  return {
    type: FETCH_EDIT_CONTACT_SELECT_OPTIONS_SUCCESS,
    regionPreferenceOptions,
    investmentTypePreferenceOptions,
  }
}

function fetchSelectOptionsFailure (error) {
  return {
    type: FETCH_EDIT_CONTACT_SELECT_OPTIONS_FAILURE,
    error,
  }
}

export function fetchAndEdiContactSelectOptions () {
  return function (dispatch, getState) {
    dispatch(fetchingSelectOptions())
    fetchRegionAndInvestmentTypes().then(axios.spread((regionRes, typeRes) => {
      const regionPreferenceOptions = formatToMultiSelectOptions(regionRes.data.results)
      const investmentTypePreferenceOptions = formatToMultiSelectOptions(typeRes.data.results)

      const regionPreferenceOptionsSelected = formatToMultiSelectOptions(getState().contact.regionPreferences)
      const investmentTypePreferenceOptionsSelected = formatToMultiSelectOptions(getState().contact.investmentTypePreferences)
      dispatch(handleRegionPreferenceChanged(regionPreferenceOptionsSelected))
      dispatch(handleTypePreferenceChanged(investmentTypePreferenceOptionsSelected))
      dispatch(fetchSelectOptionsSuccess(regionPreferenceOptions, investmentTypePreferenceOptions))
    })).catch((err) => {
      if (err.response !== undefined && err.response.status === 403) {
        dispatch(unauthUser())
      }
      console.warn('Add contact error', err)
      dispatch(fetchSelectOptionsFailure('Failed to get select options. Please reload!'))
    })
  }
}

export function fetchAndHandleContactWithId (contactId) {
  return function (dispatch) {
    fetchContactWithId(contactId)
      .then((res) => {
        const contact = camelizeKeys(res.data)
        dispatch(fetchingContactSuccess(contact))
      })
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingContactError('Failed to get contact'))
      })
  }
}

export function handleFirstNameChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_FIRST_NAME,
    value,
  }
}

export function handleLastNameChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_LAST_NAME,
    value,
  }
}

export function handleEmailChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_EMAIL,
    value,
  }
}

export function handlePhoneChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_PHONE,
    value,
  }
}

export function handleCompanyChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_COMPANY,
    value,
  }
}

export function handleTypePreferenceChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_TYPE_PREFERENCE,
    value,
  }
}

export function handleMinSizePreferenceChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_MIN_SIZE_PREFERENCE,
    value,
  }
}

export function handleMaxSizePreferenceChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_MAX_SIZE_PREFERENCE,
    value,
  }
}

export function handleSizeTypePreferenceChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_SIZE_TYPE_PREFERENCE,
    value,
  }
}

export function handleMinimumIrrReturnChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_MIN_IRR_PREFERENCE,
    value,
  }
}

export function handleMaximumIrrReturnChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_MAX_IRR_PREFERENCE,
    value,
  }
}

export function handleRegionPreferenceChanged (value) {
  return {
    type: EDIT_CONTACT_CHANGE_REGION_PREFERENCE,
    value,
  }
}

function updatingContact () {
  return {
    type: EDIT_CONTACT_UPDATING_CONTACT,
  }
}

function updateContactSuccess () {
  return {
    type: EDIT_CONTACT_UPDATE_CONTACT_SUCCESS,
  }
}

export function removeEditContactErrorMsg () {
  return {
    type: EDIT_CONTACT_REMOVE_EDIT_CONTACT_ERROR_MSG,
  }
}

function updateContactFailure (error) {
  return {
    type: EDIT_CONTACT_UPDATE_CONTACT_FAILURE,
    error,
  }
}

function convertEditContactOptions (investmentTypePreferences, regionPreferences) {
  return {
    type: EDIT_CONTACT_CONVERT_EDIT_CONTACT_OPTIONS,
    investmentTypePreferences,
    regionPreferences,
  }
}

function convertAddContactOptions (investmentTypePreferences, regionPreferences) {
  return {
    type: EDIT_CONTACT_CONVERT_EDIT_CONTACT_OPTIONS,
    investmentTypePreferences,
    regionPreferences,
  }
}

export function handleUpdateContactSubmit () {
  return function (dispatch, getState) {
    const investmentTypePreferences = formatFromSelectionOptions(getState().contact.investmentTypePreferencesSelected)
    const regionPreferences = formatFromSelectionOptions(getState().contact.regionPreferencesSelected)
    dispatch(updatingContact())
    dispatch(convertEditContactOptions(investmentTypePreferences, regionPreferences))
    const contact = decamelizeKeys(getState().contact)
    updateContact(contact)
      .then((res) => {
        dispatch(updateContactSuccess())
      })
      .catch((err) => {
        dispatch(updateContactFailure('Failed to update contact.'))
        console.warn('Error in updating contact', err)
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
    const contact = decamelizeKeys(getState().contact)
    updateContact(contact)
      .then((res) => {
        dispatch(savingNotesSuccess('Notes saved'))
        const eventProperties = { contactId: contact.id }
        amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT_SAVE_NOTES_SUCCESS, eventProperties)
      })
      .catch((err) => {
        console.warn(err)
        if (err.response !== undefined && err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(savingNotesFailure('Could not save notes. Try again!'))
        amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT_SAVE_NOTES_FAILURE)
      })
  }
}

function addCorrespondenceSuccess (correspondence) {
  return {
    type: ADD_CORRESPONDENCE_SUCCESS,
    correspondence,
  }
}

function addCorrespondenceFailure (error) {
  return {
    type: ADD_CORRESPONDENCE_FAILURE,
    error,
  }
}

export function handleTagEmailMessage (messageId, date) {
  return function (dispatch, getState) {
    const params = {
      correspondenceType: 'email',
      itemId: messageId,
      contact: getState().contact.id,
      date,
    }
    saveCorrespondence(decamelizeKeys(params))
      .then((res) => {
        const newCorrespondence = camelizeKeys(res.data)
        dispatch(addCorrespondenceSuccess(newCorrespondence))
      })
      .catch((err) => {
        console.warn(err)
        dispatch(addCorrespondenceFailure('Failed to tag email'))
      })
  }
}

export function changeOutlookContactFlag (hasOutlookContact) {
  return {
    type: CHANGE_OUTLOOK_CONTACT_FLAG,
    hasOutlookContact,
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
  investmentTypePreferencesSelected: [],
  investmentTypePreferenceOptions: [],
  minimumInvestmentSize: 0,
  maximumInvestmentSize: maxInvestmentSizePreference,
  investmentType: investmentSizeTypeEquity,
  minimumIrrReturn: 0,
  maximumIrrReturn: maxIrrReturn,
  regionPreferences: [],
  regionPreferencesSelected: [],
  regionPreferenceOptions: [],
  upcomingFollowUp: '',
  notes: '',
  isNotesPanelOpened: false,
  isSavingNotes: false,
  notesSavedSuccessMsg: '',
  notesSavedErrorMsg: '',
  creator: '',
  correspondences: [],
  hasOutlookContact: true,
  updated: false,  // to keep track of whether the contact has been updated in edit mode
}

export default function contact (state = initialState, action) {
  switch (action.type) {
    case FETCHING_CONTACT:
      return {
        ...state,
        isFetching: true,
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
    case EDIT_CONTACT_CHANGE_FIRST_NAME:
      return {
        ...state,
        firstName: action.value,
      }
    case EDIT_CONTACT_CHANGE_LAST_NAME:
      return {
        ...state,
        lastName: action.value,
      }
    case EDIT_CONTACT_CHANGE_EMAIL:
      return {
        ...state,
        email: action.value,
      }
    case EDIT_CONTACT_CHANGE_PHONE:
      return {
        ...state,
        phone: action.value,
      }
    case EDIT_CONTACT_CHANGE_COMPANY:
      return {
        ...state,
        company: action.value,
      }
    case EDIT_CONTACT_CHANGE_TYPE_PREFERENCE:
      return {
        ...state,
        investmentTypePreferencesSelected: action.value,
      }
    case EDIT_CONTACT_CHANGE_MIN_SIZE_PREFERENCE:
      return {
        ...state,
        minimumInvestmentSize: action.value,
      }
    case EDIT_CONTACT_CHANGE_MAX_SIZE_PREFERENCE:
      return {
        ...state,
        maximumInvestmentSize: action.value,
      }
    case EDIT_CONTACT_CHANGE_SIZE_TYPE_PREFERENCE:
      return {
        ...state,
        investmentType: action.value,
      }
    case EDIT_CONTACT_CHANGE_MIN_IRR_PREFERENCE:
      return {
        ...state,
        minimumIrrReturn: action.value,
      }
    case EDIT_CONTACT_CHANGE_MAX_IRR_PREFERENCE:
      return {
        ...state,
        maximumIrrReturn: action.value,
      }
    case EDIT_CONTACT_CHANGE_REGION_PREFERENCE:
      return {
        ...state,
        regionPreferencesSelected: action.value,
      }
    case EDIT_CONTACT_CONVERT_EDIT_CONTACT_OPTIONS:
      return {
        ...state,
        regionPreferences: action.regionPreferences,
        investmentTypePreferences: action.investmentTypePreferences,
      }
    case EDIT_CONTACT_UPDATING_CONTACT:
      return {
        ...state,
        isLoading: true,
        updated: false,
      }
    case EDIT_CONTACT_UPDATE_CONTACT_SUCCESS:
      return {
        ...initialState,
        error: '',
        isLoading: false,
        updated: true,
        addedContactId: action.addedContactId,
      }
    case EDIT_CONTACT_UPDATE_CONTACT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        updated: false,
        addedContactId: '',
      }
    case EDIT_CONTACT_REMOVE_EDIT_CONTACT_ERROR_MSG:
      return {
        ...state,
        error: '',
      }
    case FETCH_EDIT_CONTACT_SELECT_OPTIONS:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_EDIT_CONTACT_SELECT_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        regionPreferenceOptions: action.regionPreferenceOptions,
        investmentTypePreferenceOptions: action.investmentTypePreferenceOptions,
      }
    case FETCH_EDIT_CONTACT_SELECT_OPTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
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
        notesSavedSuccessMsg: '',
        notesSavedErrorMsg: '',
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
    case ADD_CORRESPONDENCE_SUCCESS:
      return {
        ...state,
        error: '',
        correspondences: [
          action.correspondence,
          ...state.correspondences,
        ]
      }
    case ADD_CORRESPONDENCE_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case CHANGE_OUTLOOK_CONTACT_FLAG:
      return {
        ...state,
        hasOutlookContact: action.hasOutlookContact,
      }
    default:
      return state
  }
}
