import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { fetchContactWithParams, fetchRegionAndInvestmentTypes, fetchContactsWithUrl,
        downloadContactsWithParams } from 'helpers/api'
import { formatToSelectOptions } from 'helpers/utils'
import { unauthUser } from 'redux/modules/user'
import * as analytics from 'helpers/analytics'
import { cleanFilteredContactsExportData, downloadJsonToCsv } from 'helpers/dataDownload'

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
const DOWNLOADING_FILTERED_CONTACTS = 'DOWNLOADING_FILTERED_CONTACTS'
const REMOVE_DOWNLOADING_FILTERED_CONTACTS = 'REMOVE_DOWNLOADING_FILTERED_CONTACTS'

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
      const regionPreferenceOptions = formatToSelectOptions(regionRes.data.results)
      const investmentTypePreferenceOptions = formatToSelectOptions(typeRes.data.results)

      dispatch(fetchSelectOptionsSuccess(regionPreferenceOptions, investmentTypePreferenceOptions))
    })).catch((err) => {
      console.warn('Failed to get regions and investment types', err)
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

function fetchingFilteredContactSuccess (count, next, previous, results) {
  return {
    type: FETCHING_FILTERED_CONTACTS_SUCCESS,
    count,
    next,
    previous,
    results,
  }
}

function fetchingFilteredContactFailure (error) {
  return {
    type: FETCHING_FILTERED_CONTACTS_FAILURE,
    error,
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


function handleFilterContactsSuccessResponse (dispatch, res) {
  const camelizeResponse = camelizeKeys(res.data)
  const { count, next, previous, results } = camelizeResponse
  const filteredContacts = results
  dispatch(fetchingFilteredContactSuccess(count, next, previous, results))
}

function handleFilterContactsFailureResponse (dispatch, err) {
  console.warn('Error filtering', err)
  if (err.response.status === 403) {
    dispatch(unauthUser())
  }
  dispatch(fetchingFilteredContactFailure('Error filtering contacts'))
}

function getSearchContactsParams (getState) {
  const { investmentSize, targetReturn, regionPreferences, investmentTypePreferences } = getState().filterContacts

  // TODO (Andy): This is to allow empty params. This sucks. Find a better way
  var params = {}
  if (investmentSize) params.investmentSize = investmentSize
  if (targetReturn) params.targetReturn = targetReturn
  if (regionPreferences) params.regionPreferences = regionPreferences
  if (investmentTypePreferences) params.investmentTypePreferences = investmentTypePreferences

  return params
}

export function fetchFilterContacts () {
  return function (dispatch, getState) {
    const params = getSearchContactsParams(getState)
    dispatch(fetchingFilteredContacts())
    const eventProperties = { 'filterParams' : params }
    amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_CLICKED, eventProperties)
    fetchContactWithParams(decamelizeKeys(params))
      .then((res) => {
        const camelizeResponse = camelizeKeys(res.data)
        const { count, next, previous, results } = camelizeResponse
        const filteredContacts = results
        dispatch(fetchingFilteredContactSuccess(count, next, previous, results))
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

function downloadingFilteredContacts () {
  return {
    type: DOWNLOADING_FILTERED_CONTACTS,
  }
}

function removeDownloadingFilteredContacts () {
  return {
    type: REMOVE_DOWNLOADING_FILTERED_CONTACTS,
  }
}

export function downloadContacts () {
  return function (dispatch, getState) {
    const params = getSearchContactsParams(getState)
    dispatch(downloadingFilteredContacts())
    amplitude.getInstance().logEvent(analytics.BR_OL_DOWLOAD_CONTACTS_CLICKED)
    downloadContactsWithParams(decamelizeKeys(params))
      .then((res) => {
        const allFilteredContacts = camelizeKeys(res.data)
        const exportCleanContacts = cleanFilteredContactsExportData(allFilteredContacts)
        downloadJsonToCsv(exportCleanContacts)
        dispatch(removeDownloadingFilteredContacts())
        amplitude.getInstance().logEvent(analytics.BR_OL_DOWLOAD_CONTACTS_SUCCESS)
      })
      .catch((err) => {
        console.log(error);
        dispatch(removeDownloadingFilteredContacts())
        amplitude.getInstance().logEvent(analytics.BR_OL_DOWLOAD_CONTACTS_FAILURE)
      })
  }
}

export function handlePageClicked (pageUrl) {
  return function (dispatch) {
    dispatch(fetchingFilteredContacts())
    fetchContactsWithUrl(pageUrl)
      .then((res) => {
        handleFilterContactsSuccessResponse(dispatch, res)
      }).catch((err) => {
        handleFilterContactsFailureResponse(dispatch, err)
      })
  }
}

const initialState = {
  showInputs: true,
  isFetching: false,
  isFiltering: false,
  isDownloading: false,
  error: '',
  investmentSize: '',
  targetReturn: '',
  regionPreferences: '',
  investmentTypePreferences: '',
  filteredContactsCount: 0,
  filteredContacts: [],
  filteredContactsNextUrl: '',
  filteredContactsPrevUrl: '',
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
        filteredContactsCount: 0,
        filteredContactsNextUrl: '',
        filteredContactsPrevUrl: '',
        filteredContacts: [],
      }
    case FETCHING_FILTERED_CONTACTS_SUCCESS:
      return {
        ...state,
        isFiltering: false,
        error: '',
        filteredContactsCount: action.count,
        filteredContactsNextUrl: action.next ? action.next : '',
        filteredContactsPrevUrl: action.previous ? action.previous : '',
        filteredContacts: action.results,
      }
    case FETCHING_FILTERED_CONTACTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFiltering: false,
        showInputs: true,
        filteredContactsCount: 0,
        filteredContactsNextUrl: '',
        filteredContactsPrevUrl: '',
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
    case DOWNLOADING_FILTERED_CONTACTS:
      return {
        ...state,
        isDownloading: true,
      }
    case REMOVE_DOWNLOADING_FILTERED_CONTACTS:
      return {
        ...state,
        isDownloading: false,
      }
    default:
      return state
  }
}
