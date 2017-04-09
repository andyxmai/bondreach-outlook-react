import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/auth'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { browserHistory, hashHistory } from 'react-router'
import 'react-select/dist/react-select.css'
import 'html5-history-api'
import * as analytics from 'helpers/analytics'

var location = window.history.location || window.location  // need to polyfill to make broswerHistory work

amplitude.getInstance().init(process.env.AMPLITUDE_ID)

var store = null
if (process.env.NODE_ENV === 'production')  {
  store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
     applyMiddleware(thunk),
   )
  )
} else {
  store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
     applyMiddleware(thunk),
     window.devToolsExtension ? window.devToolsExtension() : (f) => f
   )
  )
  window.devToolsExtension()
}

const history = syncHistoryWithStore(browserHistory, store)

function checkAuth (nextState, replace) {
  if (store.getState().user.isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/read')
    }
  } else {
    if (isAuthed !== true) {
      replace(`/auth/?nextPath=${nextPathName}`)
    }
  }
}

import load_themed_styles_1 from "@microsoft/load-themed-styles"
load_themed_styles_1.loadTheme({
    'themePrimary': '#00A7CF',
    'themeDark': '#007995',
})


Office.initialize = function(reason) {
  amplitude.getInstance().logEvent(analytics.BR_OL_APP_OPENED)

  ReactDOM.render(
    <Provider store={store}>
      {getRoutes(checkAuth, history)}
    </Provider>,
    document.getElementById('app')
  )
}
