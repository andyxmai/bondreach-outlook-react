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

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
   applyMiddleware(thunk),
 )
)

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth (nextState, replace) {
  return true
  if (store.getState().users.isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>,
  document.getElementById('app')
)
