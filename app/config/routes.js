import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  AddContactContainer, AddReminderContainer, ComposeContainer, ViewContactContainer,
  ReadContainer, FilterContactsContainer, EnsureLoggedInContainer
} from 'containers'

export default function getRoutes (history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} />

        <Route component={EnsureLoggedInContainer}>
          <Route path='add-contact' component={AddContactContainer} />
          <Route path='add-reminder/:contactId' component={AddReminderContainer} />
          <Route path='compose' component={ComposeContainer} />
          <Route path='filter-contacts' component={FilterContactsContainer} />
          <Route path='read' component={ReadContainer} />
          <Route path='view-contact/:contactId' component={ViewContactContainer} />
        </Route>

        <IndexRoute component={ HomeContainer } />
      </Router>
    </Router>
  )
}
