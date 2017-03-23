import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { fetchContactWithParams, fetchRegionAndInvestmentTypes } from 'helpers/api'
import { formatToSelectOptions } from 'helpers/utils'
import { unauthUser } from 'redux/modules/user'
import * as analytics from 'helpers/analytics'

const CHANGE_INVESTMENT_TYPE_FILTER = 'CHANGE_INVESTMENT_TYPE_FILTER'
const CHANGE_INVESTMENT_SIZE_FILTER = 'CHANGE_INVESTMENT_SIZE_FILTER'
const CHANGE_INVESTMENT_RETURN_FILTER = 'CHANGE_INVESTMENT_RETURN_FILTER'
const CHANGE_INVESTMENT_REGION_FILTER = 'CHANGE_INVESTMENT_REGION_FILTER'
const FETCHING_FILTERED_CONTACTS = 'FETCHING_FILTERED_CONTACTS'
const FETCHING_FILTERED_CONTACTS_SUCCESS = 'FETCHING_FILTERED_CONTACTS_SUCCESS'
const FETCHING_FILTERED_CONTACTS_FAILURE = 'FETCHING_FILTERED_CONTACTS_FAILURE'
const FETCHING_FILTERED_CONTACTS_SELECT_OPTIONS = 'FETCHING_FILTERED_CONTACTS_SELECT_OPTIONS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS_SUCCESS'
const FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE = 'FETCH_FILTER_CONTACTS_SELECT_OPTIONS_FAILURE'
const RESET_FILTER_CONTACTS = 'RESET_FILTER_CONTACTS'
const CHANGE_SHOW_INPUTS = 'CHANGE_SHOW_INPUTS'

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

export function handleInvestmentReturnFilterChanged (value) {
  return {
    type: CHANGE_INVESTMENT_RETURN_FILTER,
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
    const { investmentSize, targetReturn, regionPreferences, investmentTypePreferences } = getState().filterContacts

    // TODO (Andy): This is to allow empty params. This sucks. Find a better way
    var params = {}
    if (investmentSize) params.investmentSize = investmentSize
    if (targetReturn) params.targetReturn = targetReturn
    if (regionPreferences) params.regionPreferences = regionPreferences
    if (investmentTypePreferences) params.investmentTypePreferences = investmentTypePreferences
    dispatch(fetchingFilteredContacts())
    const eventProperties = { 'filterParams' : params }
    amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_CLICKED, eventProperties)
    fetchContactWithParams(decamelizeKeys(params))
      .then((res) => {
        const filteredContacts = camelizeKeys(res.data)
        dispatch(fetchingFilteredContactSuccess(filteredContacts))
        amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_SUCCESS, eventProperties)
      })
      .catch((err) => {
        console.warn('Error filtering', err)
        if (err.response.status === 403) {
          dispatch(unauthUser())
        }
        dispatch(fetchingFilteredContactFailure('Error filtering contacts'))
        amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_FAILURE, eventProperties)
      })
  }
}

export function resetFilterContacts () {
  return {
    type: RESET_FILTER_CONTACTS,
  }
}

export function exchangeShowInputs () {
  return {
    type: CHANGE_SHOW_INPUTS,
  }
}

const initialState = {
  showInputs: true,
  isFetching: false,
  isFiltering: false,
  error: '',
  investmentSize: '',
  targetReturn: '',
  regionPreferences: '',
  investmentTypePreferences: '',
  filteredContacts: [],
  regionPreferenceOptions: [],
  investmentTypePreferenceOptions: [],
}

export default function filterContacts (state = initialState, action) {
  switch (action.type) {
    case CHANGE_INVESTMENT_TYPE_FILTER:
      return {
        ...state,
        investmentTypePreferences: action.value,
      }
    case CHANGE_INVESTMENT_SIZE_FILTER:
      return {
        ...state,
        investmentSize: action.value,
      }
    case CHANGE_INVESTMENT_RETURN_FILTER:
      return {
        ...state,
        targetReturn: action.value,
      }
    case CHANGE_INVESTMENT_REGION_FILTER:
      return {
        ...state,
        regionPreferences: action.value,
      }
    case FETCHING_FILTERED_CONTACTS:
      return {
        ...state,
        isFiltering: true,
        showInputs: true,
        filteredContacts: [],
      }
    case FETCHING_FILTERED_CONTACTS_SUCCESS:
      return {
        ...state,
        isFiltering: false,
        showInputs: true,
        error: '',
        filteredContacts: action.filteredContacts,
      }
    case FETCHING_FILTERED_CONTACTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFiltering: false,
        showInputs: true,
        filteredContacts: [],
      }
    case FETCH_FILTER_CONTACTS_SELECT_OPTIONS:
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      }
    case RESET_FILTER_CONTACTS:
      const regionPreferenceOptions = state.regionPreferenceOptions
      const investmentTypePreferenceOptions = state.investmentTypePreferenceOptions
      return {
        ...state,
        ...initialState,
        regionPreferenceOptions,
        investmentTypePreferenceOptions,
      }
    case CHANGE_SHOW_INPUTS:
      return {
        ...state,
        showInputs: !state.showInputs,
      }
    default:
      return state
  }
}
