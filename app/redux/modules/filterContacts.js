import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { fetchContactWithParams, fetchRegionAndInvestmentTypes } from 'helpers/api'
import { formatToSelectOptions } from 'helpers/utils'
import { unauthUser } from 'redux/modules/user'

const CHANGE_INVESTMENT_TYPE_FILTER = 'CHANGE_INVESTMENT_TYPE_FILTER'
const CHANGE_INVESTMENT_SIZE_FILTER = 'CHANGE_INVESTMENT_SIZE_FILTER'
const CHANGE_INVESTMENT_REGION_FILTER = 'CHANGE_INVESTMENT_REGION_FILTER'
const FETCHING_FILTERED_CONTACTS = 'FETCHING_FILTERED_CONTACTS'
const FETCHING_FILTERED_CONTACTS_SUCCESS = 'FETCHING_FILTERED_CONTACTS_SUCCESS'
const FETCHING_FILTERED_CONTACTS_FAILURE = 'FETCHING_FILTERED_CONTACTS_FAILURE'
const FETCHING_FILTERED_CONTACTS_SELECT_OPTIONS = 'FETCHING_FILTERED_CONTACTS_SELECT_OPTIONS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE'
const RESET_FILTER_CONTACTS = 'RESET_FILTER_CONTACTS'

function fetchingSelectOptions () {
  return {
    type: FETCH_FILTER_CONTACTS_SELECT_OPTIONS,
  }
}

function fetchSelectOptionsSuccess (regionPreferenceOptions, investmentTypePreferenceOptions) {
  return {
    type: FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS,
    regionPreferenceOptions,
    investmentTypePreferenceOptions,
  }
}

function fetchSelectOptionsFailure (error) {
  return {
    type: FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE,
    error,
  }
}

export function fetchAndAddSelectOptions () {
  return function (dispatch) {
    dispatch(fetchingSelectOptions())
    fetchRegionAndInvestmentTypes().then(axios.spread((regionRes, typeRes) => {
      const regionPreferenceOptions = formatToSelectOptions(regionRes.data)
      const investmentTypePreferenceOptions = formatToSelectOptions(typeRes.data)

      dispatch(fetchSelectOptionsSuccess(regionPreferenceOptions, investmentTypePreferenceOptions))
    })).catch((err) => {
      console.warn('Failed to get regions and investment types')
      if (err.response.status === 403) {
        dispatch(unauthUser())
      }
      dispatch(fetchSelectOptionsFailure('Failed to get select options. Please reload!'))
    })
  }
}

export function handleInvestmentTypeFilterChanged (value) {
  return {
    type: CHANGE_INVESTMENT_TYPE_FILTER,
    value,
  }
}

export function handleInvestmentSizeFilterChanged (value) {
  return {
    type: CHANGE_INVESTMENT_SIZE_FILTER,
    value,
  }
}

export function handleInvestmentRegionFilterChanged (value) {
  return {
    type: CHANGE_INVESTMENT_REGION_FILTER,
    value,
  }
}

function fetchingFilteredContacts () {
  return {
    type: FETCHING_FILTERED_CONTACTS,
  }
}

function fetchingFilteredContactSuccess (filteredContacts) {
  return {
    type: FETCHING_FILTERED_CONTACTS_SUCCESS,
    filteredContacts,
  }
}

function fetchingFilteredContactFailure (error) {
  return {
    type: FETCHING_FILTERED_CONTACTS_FAILURE,
    error,
  }
}

export function fetchFilterContacts () {
  return function (dispatch, getState) {
    const { investmentSize, regionPreferences, investmentTypePreferences }  = getState().filterContacts

    // TODO (Andy): This is to allow empty params. This sucks. Find a better way
    var params = {}
    if (investmentSize) params.investmentSize = investmentSize
    if (regionPreferences) params.regionPreferences = regionPreferences
    if (investmentTypePreferences) params.investmentTypePreferences = investmentTypePreferences

    dispatch(fetchingFilteredContacts)
    fetchContactWithParams(decamelizeKeys(params))
      .then((res) => {
        const filteredContacts = camelizeKeys(res.data)
        dispatch(fetchingFilteredContactSuccess(filteredContacts))
      })
      .catch((err) => {
        console.warn('Error filtering')
        if (err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(fetchingFilteredContactFailure('Error filtering contacts'))
      })
  }
}

export function handleAddToBcc () {
  return function (dispatch, getState) {
    const { filteredContacts } = getState().filterContacts
    const emails = filteredContacts.map(function(contact) {return contact.email})
    Office.context.mailbox.item.bcc.setAsync( emails )
  }
}

export function resetFilterContacts () {
  return {
    type: RESET_FILTER_CONTACTS
  }
}

const initialState = {
  hasQueried: false,
  isFetching: false,
  error: '',
  investmentSize: '',
  regionPreferences: '',
  investmentTypePreferences: '',
  filteredContacts: [],
  regionPreferenceOptions: [],
  investmentTypePreferenceOptions: []
}

export default function filterContacts (state = initialState, action) {
  switch(action.type) {
    case CHANGE_INVESTMENT_TYPE_FILTER:
      return {
        ...state,
        investmentTypePreferences: action.value,
      }
    case CHANGE_INVESTMENT_SIZE_FILTER:
      return {
        ...state,
        investmentSize: action.value
      }
    case CHANGE_INVESTMENT_REGION_FILTER:
      return {
        ...state,
        regionPreferences: action.value
      }
    case FETCHING_FILTERED_CONTACTS:
      return {
        ...state,
        hasQueried: true,
        isFetching: true,
        filteredContacts: [],
      }
    case FETCHING_FILTERED_CONTACTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasQueried: true,
        error: '',
        filteredContacts: action.filteredContacts
      }
    case FETCHING_FILTERED_CONTACTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        hasQueried: true,
        filteredContacts: [],
      }
    case FETCH_FILTER_CONTACTS_SELECT_OPTIONS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        regionPreferenceOptions: action.regionPreferenceOptions,
        investmentTypePreferenceOptions: action.investmentTypePreferenceOptions,
      }
    case FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case RESET_FILTER_CONTACTS:
      return initialState
    default:
      return state
  }
}
