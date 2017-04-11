import axios from 'axios'
import { fetchFeed, fetchNewsFeed } from 'helpers/api'

const FETCHING_FEED = 'FETCHING_FEED'
const FETCHING_FEED_SUCCESS = 'FETCHING_FEED_SUCCESS'
const FETCHING_FEED_FAILURE = 'FETCHING_FEED_FAILURE'

function fetchingFeed () {
  return {
    type: FETCHING_FEED,
  }
}

function fetchingFeedSuccess (newsFeed, teamFeed) {
  return {
    type: FETCHING_FEED_SUCCESS,
    newsFeed,
    teamFeed,
  }
}

function fetchingFeedFailure (error) {
  return {
    type: FETCHING_NEWS_FEED_FAILURE,
    error,
  }
}

export function fetchAndHandleFeed () {
  return function (dispatch) {
    dispatch(fetchingFeed())
    fetchFeed()
      .then(axios.spread((newsFeedRes, teamFeedRes) => {
        dispatch(fetchingFeedSuccess(newsFeedRes.data.results, teamFeedRes.data.results))
      }))
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingFeedFailure('Failed to fetch feed'))
      })
  }
}

const initialState = {
  isFetching: false,
  error: '',
  newsFeed: [],
  teamFeed: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case FETCHING_FEED:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        newsFeed: action.newsFeed,
        teamFeed: action.teamFeed,
      }
    case FETCHING_FEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
