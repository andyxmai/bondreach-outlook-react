import { fetchNewsFeed } from 'helpers/api'

const FETCHING_NEWS_FEED = 'FETCHING_NEWS_FEED'
const FETCHING_NEWS_FEED_SUCCESS = 'FETCHING_NEWS_FEED_SUCCESS'
const FETCHING_NEWS_FEED_FAILURE = 'FETCHING_NEWS_FEED_FAILURE'

function fetchingNewsFeed () {
  return {
    type: FETCHING_NEWS_FEED,
  }
}

function fetchingNewsFeedSuccess (newsFeed) {
  return {
    type: FETCHING_NEWS_FEED_SUCCESS,
    newsFeed,
  }
}

function fetchingNewsFeedFailure (error) {
  return {
    type: FETCHING_NEWS_FEED_FAILURE,
    error,
  }
}

export function fetchAndHandleNewsFeed () {
  return function (dispatch) {
    dispatch(fetchAndHandleNewsFeed)
    fetchNewsFeed()
      .then((res) => {
        dispatch(fetchingNewsFeedSuccess(res.data.results))
      }).catch((err) => {
        console.warn(err)
        dispatch(fetchingNewsFeedFailure('Failed to fetch news feed'))
      })
  }
}

const initialState = {
  isFetching: false,
  error: '',
  newsFeed: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case FETCHING_NEWS_FEED:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_NEWS_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        newsFeed: action.newsFeed,
      }
    case FETCHING_NEWS_FEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
