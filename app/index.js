import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { browserHistory, hashHistory } from 'react-router'
import 'html5-history-api'
import 'react-select/dist/react-select.css'

var location = window.history.location || window.location  // need to polyfill to make broswerHistory work

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
   applyMiddleware(thunk),
   window.devToolsExtension ? window.devToolsExtension() : (f) => f
 )
)

const history = syncHistoryWithStore(browserHistory, store)
window.devToolsExtension()

Office.initialize = function (reason) {
  ReactDOM.render(
    <Provider store={store}>
      {getRoutes(history)}
    </Provider>,
    document.getElementById('app')
  )
}
