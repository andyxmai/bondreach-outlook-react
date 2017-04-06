import axios from 'axios'
import { camelizeKeys, decamelizeKeys, pascalizeKeys } from 'humps'
import { fetchContactWithParams, fetchRegionAndInvestmentTypes, fetchContactsWithUrl,
        downloadContactsWithParams, fetchContactsByCompanyWithParams,
        downloadCompanyContactsWithParams, } from 'helpers/api'
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
const CHANGE_GROUP_BY_COMPANY = 'CHANGE_GROUP_BY_COMPANY'
const SHOW_FILTER_CONTACTS_DIALOG = 'SHOW_FILTER_CONTACTS_DIALOG'
const HIDE_FILTER_CONTACTS_DIALOG = 'HIDE_FILTER_CONTACTS_DIALOG'
const FETCH_COMPANY_CONTACT_DETAIL_SUCCESS = 'FETCH_COMPANY_CONTACT_DETAIL_SUCCESS'
const FETCH_COMPANY_CONTACT_DETAIL_FAILURE = 'FETCH_COMPANY_CONTACT_DETAIL_FAILURE'

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
      if (err.response !== undefined && err.response.status === 403) {
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
  if (err.response !== undefined && err.response.status === 403) {
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
        console.warn(err)
        dispatch(removeDownloadingFilteredContacts())
        amplitude.getInstance().logEvent(analytics.BR_OL_DOWLOAD_CONTACTS_FAILURE)
      })
  }
}

export function downloadCompanyContacts () {
  return function (dispatch, getState) {
    const params = getSearchContactsParams(getState)
    dispatch(downloadingFilteredContacts())
    downloadCompanyContactsWithParams(decamelizeKeys(params))
      .then((res) => {
        const allFilteredContacts = pascalizeKeys(res.data)
        downloadJsonToCsv(allFilteredContacts)
        dispatch(removeDownloadingFilteredContacts())
      })
      .catch((err) => {
        console.warn(err)
        dispatch(removeDownloadingFilteredContacts())
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

export function changeGroupByCompany (isChecked) {
  return {
    type: CHANGE_GROUP_BY_COMPANY,
    isChecked,
  }
}

function filterContactsSuccessHandler (dispatch, data) {
  const camelizeResponse = camelizeKeys(data)
  const { count, next, previous, results } = camelizeResponse
  const filteredContacts = results
  dispatch(fetchingFilteredContactSuccess(count, next, previous, results))
}

function filterContactsErrorHandler (dispatch, err) {
  if (err.response !== undefined && err.response.status === 403) {
    dispatch(unauthUser())
  }
  dispatch(fetchingFilteredContactFailure('Error filtering contacts'))
}

function handleFilterByCompany (dispatch, params) {
  amplitude.getInstance().logEvent(analytics.BR_OL_GROUP_CONTACTS_BY_COMPANY_CLICKED)
  dispatch(fetchingFilteredContacts())
  fetchContactsByCompanyWithParams(decamelizeKeys(params))
    .then((res) => {
      filterContactsSuccessHandler(dispatch, res.data)
    })
    .catch((err) => {
      console.warn('Error filtering', err)
      filterContactsErrorHandler(dispatch, err)
    })
}

function handleFilterByContacts (dispatch, params) {
  dispatch(fetchingFilteredContacts())
  const eventProperties = { 'filterParams' : params }
  amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_CLICKED, eventProperties)
  fetchContactWithParams(decamelizeKeys(params))
    .then((res) => {
      filterContactsSuccessHandler(dispatch, res.data)
      amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_SUCCESS, eventProperties)
    })
    .catch((err) => {
      console.warn('Error filtering', err)
      filterContactsErrorHandler(dispatch, err)
      amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_FAILURE, eventProperties)
    })
}

export function handleFilterContacts () {
  return function (dispatch, getState) {
    const params = getSearchContactsParams(getState)
    const isGroupByCompanyChecked = getState().filterContacts.isGroupByCompanyChecked
    if (isGroupByCompanyChecked) {
      handleFilterByCompany(dispatch, params)
    } else {
      handleFilterByContacts(dispatch, params)
    }
  }
}

function showFilterContactsDialog () {
  return {
    type: SHOW_FILTER_CONTACTS_DIALOG,
  }
}

export function hideFilterContactsDialog () {
  return {
    type: HIDE_FILTER_CONTACTS_DIALOG,
  }
}

function fetchCompanyContactDetailSuccess (companyContactDetail) {
  return {
    type: FETCH_COMPANY_CONTACT_DETAIL_SUCCESS,
    companyContactDetail,
  }
}

function fetchCompanyContactDetailFailure (error) {
  return {
    type: FETCH_COMPANY_CONTACT_DETAIL_FAILURE,
    error,
  }
}

export function fetchCompanyContactDetail (company) {
  return function (dispatch) {
    dispatch(showFilterContactsDialog())
    fetchContactWithParams({company})
      .then((res) => {
        const companyContactDetail = camelizeKeys(res.data.results)
        dispatch(fetchCompanyContactDetailSuccess(companyContactDetail))
      })
      .catch((err) => {
        console.warn(err);
        fetchCompanyContactDetailFailure('Failed to get company contact details')
      })
  }
}

const initialState = {
  showInputs: true,
  isFetching: false,
  isFiltering: false,
  isDownloading: false,
  isGroupByCompanyChecked: false,
  isDialogOpened: false,
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
  filteredCompanyContactDetail: [],
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
    case CHANGE_GROUP_BY_COMPANY:
      return {
        ...state,
        isGroupByCompanyChecked: action.isChecked,
      }
    case SHOW_FILTER_CONTACTS_DIALOG:
      return {
        ...state,
        isDialogOpened: true,
      }
    case HIDE_FILTER_CONTACTS_DIALOG:
      return {
        ...state,
        isDialogOpened: false,
      }
    case FETCH_COMPANY_CONTACT_DETAIL_SUCCESS:
      return {
        ...state,
        filteredCompanyContactDetail: action.companyContactDetail,
      }
    case FETCH_COMPANY_CONTACT_DETAIL_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
