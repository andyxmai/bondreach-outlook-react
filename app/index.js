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

var store = null
if (process.env.NODE_ENV === 'production')  {
  amplitude.getInstance().init("91f11eeff27600bba31199da4107f74a")
  store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
     applyMiddleware(thunk),
   )
  )
} else {
  amplitude.getInstance().init("a2fcc11da4b7eac3832b414aa0078296")
  store = createStore(
    combineReducers({...reducers, routing: routerReducer}),
    compose(
     applyMiddleware(thunk),
   )
  )
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
// ReactDOM.render(
//   <Provider store={store}>
//     {getRoutes(checkAuth, history)}
//   </Provider>,
//   document.getElementById('app')
// )

Office.initialize = function(reason) {
  amplitude.getInstance().logEvent(analytics.BR_OL_APP_OPENED)

  ReactDOM.render(
    <Provider store={store}>
      {getRoutes(checkAuth, history)}
    </Provider>,
    document.getElementById('app')
  )
}
