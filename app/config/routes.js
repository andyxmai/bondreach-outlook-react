import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer, NewPropertyContainer,
  ExpensesContainer, RentRollContainer, PropertyContainer, CashflowsContainer,
  AddContactContainer, AddReminderContainer, ComposeContainer, ViewContactContainer,
  ReadContainer, FilterContactsContainer, EnsureLoggedInContainer
} from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} />
        <Route path='logout' component={LogoutContainer} />

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
