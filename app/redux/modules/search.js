import { camelizeKeys } from 'humps'
import { fetchContactWithParams } from 'helpers/api'
import * as analytics from 'helpers/analytics'

const FETCHING_SEARCH_RESULTS = 'FETCHING_SEARCH_RESULTS'
const FETCHING_SEARCH_RESULTS_SUCCESS = 'FETCHING_SEARCH_RESULTS_SUCCESS'
const FETCHING_SEARCH_RESULTS_ERROR = 'FETCHING_SEARCH_RESULTS_ERROR'
const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY'
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS'

function fetchingSearchResults () {
  return {
    type: FETCHING_SEARCH_RESULTS,
  }
}

function fetchingSearchResultsSuccess (results) {
  return {
    type: FETCHING_SEARCH_RESULTS_SUCCESS,
    results,
  }
}

function fetchingSearchResultsError (error) {
  return {
    type: FETCHING_SEARCH_RESULTS_ERROR,
    error,
  }
}

function updateSearchResults (results) {
  return {
    type: UPDATE_SEARCH_RESULTS,
    results,
  }
}

export function handleSearchQueryChanged (value) {
  return {
    type: CHANGE_SEARCH_QUERY,
    value,
  }
}

export function fetchAndHandleSearchResults () {
  return function (dispatch, getState) {
    const search = getState().search.query
    const eventProperties = { search }
    if (search === '') {
      dispatch(updateSearchResults([]))  // empty out search results
      return
    }

    dispatch(fetchingSearchResults())
    fetchContactWithParams({search})
      .then((res) => {
        dispatch(fetchingSearchResultsSuccess(camelizeKeys(res.data)))
        amplitude.getInstance().logEvent(analytics.BR_OL_SEARCH_CONTACTS_CLICKED, eventProperties)
      })
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingSearchResultsError('Error getting search results'))
        amplitude.getInstance().logEvent(analytics.BR_OL_SEARCH_CONTACTS_CLICKED, eventProperties)
      })
  }
}


const initialState = {
  isFetching: false,
  error: '',
  hasQueried: false,
  query: '',
  results: [],
}

export default function search (state = initialState, action) {
  switch (action.type) {
    case FETCHING_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: true,
        hasQueried: true,
      }
    case FETCHING_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        results: action.results,
      }
    case FETCHING_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        query: action.value,
      }
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results,
      }
    default:
      return state
  }
}
