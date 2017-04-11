import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  AddContactContainer, AddReminderContainer, ComposeContainer, ViewContactContainer,
  EditContactContainer, ReadContainer, FilterContactsContainer, EnsureLoggedInContainer,
  SearchContainer, ProfileContainer, FeedContainer,
} from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} />

        <Route component={EnsureLoggedInContainer}>
          <Route path='add-contact' component={AddContactContainer} />
          <Route path='add-reminder/:contactId' component={AddReminderContainer} />
          <Route path='compose' component={ComposeContainer} />
          <Route path='edit-contact' component={EditContactContainer} />
          <Route path='feed' component={FeedContainer} />
          <Route path='filter-contacts' component={FilterContactsContainer} />
          <Route path='profile' component={ProfileContainer} />
          <Route path='read' component={FeedContainer} />
          <Route path='search' component={SearchContainer} />
          <Route path='view-contact/:contactId' component={ViewContactContainer} />
        </Route>
        <IndexRoute component={ HomeContainer } />
      </Router>
    </Router>
  )
}
