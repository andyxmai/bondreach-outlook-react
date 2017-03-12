import axios from 'axios'
import { Map, List } from 'immutable'
import { formatFromSelectionOptions, formatToMultiSelectOptions, parseDisplayName } from 'helpers/utils'
import { saveContact, fetchRegionAndInvestmentTypes } from 'helpers/api'
import { maxInvestmentSizePreference } from 'config/constants'
import { unauthUser } from 'redux/modules/user'

const LOADING_INFO = 'LOADING_INFO'
const LOADING_INFO_COMPLETE = 'LOADING_INFO_COMPLETE'
const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME'
const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME'
const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PHONE = 'CHANGE_PHONE'
const CHANGE_COMPANY = 'CHANGE_COMPANY'
const CHANGE_TYPE_PREFERENCE = 'CHANGE_TYPE_PREFERENCE'
const CHANGE_MIN_SIZE_PREFERENCE = 'CHANGE_MIN_SIZE_PREFERENCE'
const CHANGE_MAX_SIZE_PREFERENCE = 'CHANGE_MAX_SIZE_PREFERENCE'
const CHANGE_REGION_PREFERENCE = 'CHANGE_REGION_PREFERENCE'
const CHANGE_NOTES = 'CHANGE_NOTES'
const CONVERT_ADD_CONTACT_OPTIONS = 'CONVERT_ADD_CONTACT_OPTIONS'
const ADDING_CONTACT = 'ADDING_CONTACT'
const ADD_CONTACT = 'ADD_CONTACT'
const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'
const REMOVE_ADD_CONTACT_SUCCESS_MSG = 'REMOVE_ADD_CONTACT_SUCCESS_MSG'
const REMOVE_ADD_CONTACT_ERROR_MSG = 'REMOVE_ADD_CONTACT_ERROR_MSG'
const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE'
const FETCH_ADD_CONTACT_SELECT_OPTIONS = 'FETCH_ADD_CONTACT_SELECT_OPTIONS'
const FETCH_ADD_CONTACT_SELECT_OPTIONS_SUCCESS = 'FETCH_ADD_CONTACT_SELECT_OPTIONS_SUCCESS'
const FETCH_ADD_CONTACT_SELECT_OPTIONS_FAILURE = 'FETCH_ADD_CONTACT_SELECT_OPTIONS_FAILURE'
const RESET_ADD_CONTACT = 'RESET_ADD_CONTACT'
const SHOW_NOTES = 'SHOW_NOTES'
const HIDE_NOTES = 'HIDE_NOTES'
const CHANGE_NEW_CONTACT_CREATOR = 'CHANGE_NEW_CONTACT_CREATOR'

function fetchingSelectOptions () {
  return {
    type: FETCH_ADD_CONTACT_SELECT_OPTIONS,
  }
}

function fetchSelectOptionsSuccess (regionPreferenceOptions, investmentTypePreferenceOptions) {
  return {
    type: FETCH_ADD_CONTACT_SELECT_OPTIONS_SUCCESS,
    regionPreferenceOptions,
    investmentTypePreferenceOptions,
  }
}

function fetchSelectOptionsFailure (error) {
  return {
    type: FETCH_ADD_CONTACT_SELECT_OPTIONS_FAILURE,
    error,
  }
}

export function fetchAndAddSelectOptions () {
  return function (dispatch) {
    dispatch(fetchingSelectOptions())
    fetchRegionAndInvestmentTypes().then(axios.spread((regionRes, typeRes) => {
      const regionPreferenceOptions = formatToMultiSelectOptions(regionRes.data)
      const investmentTypePreferenceOptions = formatToMultiSelectOptions(typeRes.data)

      dispatch(fetchSelectOptionsSuccess(regionPreferenceOptions, investmentTypePreferenceOptions))
    })).catch((err) => {
      if (err.response.status === 403) {
        dispatch(unauthUser())
      }
      console.warn('Failed to get regions and investment types')
      dispatch(fetchSelectOptionsFailure('Failed to get select options. Please reload!'))
    })
  }
}

function loadingInfo () {
  return {
    type: LOADING_INFO,
  }
}

function loadingInfoComplete () {
  return {
    type: LOADING_INFO_COMPLETE,
  }
}

export function handleFirstNameChanged (value) {
  return {
    type: CHANGE_FIRST_NAME,
    value,
  }
}

export function handleLastNameChanged (value) {
  return {
    type: CHANGE_LAST_NAME,
    value,
  }
}

export function handleEmailChanged (value) {
  return {
    type: CHANGE_EMAIL,
    value,
  }
}

export function handlePhoneChanged (value) {
  return {
    type: CHANGE_PHONE,
    value,
  }
}

export function handleCompanyChanged (value) {
  return {
    type: CHANGE_COMPANY,
    value,
  }
}

export function handleTypePreferenceChanged (value) {
  return {
    type: CHANGE_TYPE_PREFERENCE,
    value
  }
}

export function handleMinSizePreferenceChanged (value) {
  return {
    type: CHANGE_MIN_SIZE_PREFERENCE,
    value
  }
}

export function handleMaxSizePreferenceChanged (value) {
  return {
    type: CHANGE_MAX_SIZE_PREFERENCE,
    value
  }
}

export function handleRegionPreferenceChanged (value) {
  return {
    type: CHANGE_REGION_PREFERENCE,
    value
  }
}

export function handleNotesChanged (value) {
  return {
    type: CHANGE_NOTES,
    value,
  }
}

function addingContact () {
  return {
    type: ADDING_CONTACT,
  }
}

function addContactSuccess () {
  return {
    type: ADD_CONTACT_SUCCESS,
  }
}

export function removeAddContactSuccessMsg () {
  return {
    type: REMOVE_ADD_CONTACT_SUCCESS_MSG
  }
}

export function removeAddContactErrorMsg () {
  return {
    type: REMOVE_ADD_CONTACT_ERROR_MSG
  }
}


function addContactFailure (error) {
  return {
    type: ADD_CONTACT_FAILURE,
    error,
  }
}

function convertAddContactOptions (investmentTypePreferences, regionPreferences) {
  return {
    type: CONVERT_ADD_CONTACT_OPTIONS,
    investmentTypePreferences,
    regionPreferences
  }
}

export function handleAddContactSubmit (successCB) {
  return function (dispatch, getState) {
    const investmentTypePreferences = formatFromSelectionOptions(getState().addContact.investmentTypePreferencesSelected)
    const regionPreferences = formatFromSelectionOptions(getState().addContact.regionPreferencesSelected)
    dispatch(addingContact())
    dispatch(convertAddContactOptions(investmentTypePreferences, regionPreferences))
    saveContact(getState().addContact)
      .then((res) => {
        const newContact = res.data
        dispatch(addContactSuccess())
        successCB(newContact.id)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(addContactFailure('Failed to save contact.'))
        console.warn('Error in saving contact', err)
      })
  }
}

export function loadAndStoreContactInfo () {
  return function (dispatch) {
    dispatch(loadingInfo())
    const email = Office.context.mailbox.item.from.emailAddress
    const displayName = Office.context.mailbox.item.from.displayName
    const {firstName, lastName } = parseDisplayName(displayName)
    dispatch(handleEmailChanged(email))
    dispatch(handleFirstNameChanged(firstName))
    dispatch(handleLastNameChanged(lastName))
    dispatch(loadingInfoComplete())
  }
}

function changeNewContactCreator (creator) {
  return {
    type: CHANGE_NEW_CONTACT_CREATOR,
    creator,
  }
}

export function addCreator() {
  return function (dispatch, getState) {
    dispatch(changeNewContactCreator(getState().user.authedId))
  }
}

export function resetAddNewContact () {
  return {
    type: RESET_ADD_CONTACT,
  }
}

export function showNotesPanel () {
  return {
    type: SHOW_NOTES,
  }
}

export function hideNotesPanel () {
  return {
    type: HIDE_NOTES,
  }
}

const initialState = {
  isLoading: true,
  error: '',
  successMsg: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  investmentTypePreferences: [],
  investmentTypePreferencesSelected: [],
  minimumInvestmentSize: 0,
  maximumInvestmentSize: maxInvestmentSizePreference,
  regionPreferences: [],
  regionPreferencesSelected: [],
  regionPreferenceOptions: [],
  investmentTypePreferenceOptions: [],
  isNotesPanelOpened: false,
  notes: '',
  creator: '',  // the customer's ID
}

export default function addContact (state = initialState, action) {
  switch (action.type) {
    case LOADING_INFO :
      return {
        ...state,
        isLoading: true,
      }
    case LOADING_INFO_COMPLETE :
      return {
        ...state,
        isLoading: false,
      }
    case CHANGE_FIRST_NAME:
      return {
        ...state,
        firstName: action.value,
      }
    case CHANGE_LAST_NAME:
      return {
        ...state,
        lastName: action.value
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.value
      }
    case CHANGE_PHONE:
      return {
        ...state,
        phone: action.value
      }
    case CHANGE_COMPANY:
      return {
        ...state,
        company: action.value
      }
    case CHANGE_TYPE_PREFERENCE:
      return {
        ...state,
        investmentTypePreferencesSelected: action.value
      }
    case CHANGE_MIN_SIZE_PREFERENCE:
      return {
        ...state,
        minimumInvestmentSize: action.value
      }
    case CHANGE_MAX_SIZE_PREFERENCE:
      return {
        ...state,
        maximumInvestmentSize: action.value
      }
    case CHANGE_REGION_PREFERENCE:
      return {
        ...state,
        regionPreferencesSelected: action.value
      }
    case CHANGE_NOTES:
      return {
        ...state,
        notes: action.value,
      }
    case CHANGE_NEW_CONTACT_CREATOR:
      return {
        ...state,
        creator: action.creator,
      }
    case CONVERT_ADD_CONTACT_OPTIONS:
      return {
        ...state,
        regionPreferences: action.regionPreferences,
        investmentTypePreferences: action.investmentTypePreferences,
      }
    case ADDING_CONTACT:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_CONTACT_SUCCESS:
      return {
        ...initialState,
        error: '',
        isLoading: false,
      }
    case ADD_CONTACT_FAILURE:
      return {
        ...state,
        error: action.error,
        successMsg: '',
        isLoading: false,
      }
    case REMOVE_ADD_CONTACT_SUCCESS_MSG:
      return {
        ...state,
        successMsg: '',
      }
    case REMOVE_ADD_CONTACT_ERROR_MSG:
      return {
        ...state,
        error: ''
      }
    case FETCH_ADD_CONTACT_SELECT_OPTIONS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ADD_CONTACT_SELECT_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        regionPreferenceOptions: action.regionPreferenceOptions,
        investmentTypePreferenceOptions: action.investmentTypePreferenceOptions,
      }
    case FETCH_ADD_CONTACT_SELECT_OPTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case RESET_ADD_CONTACT:
      return initialState
    case SHOW_NOTES:
      return {
        ...state,
        isNotesPanelOpened: true,
      }
    case HIDE_NOTES:
      return {
        ...state,
        isNotesPanelOpened: false,
      }
    default:
      return state
  }
}
