import React, { PropTypes } from 'react'
import cookie from 'react-cookie'
import { AddReminderContainer, AuthenticateContainer, ReadContainer } from 'containers'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user'
import * as addContactActionCreators from 'redux/modules/addContact'
import * as filterContactActionCreators from 'redux/modules/filterContacts'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { centerPage } from 'sharedStyles/styles.css'
import * as analytics from 'helpers/analytics'

const MainContainer = React.createClass({
  propTypes: {
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
  },

  componentDidUpdate(prevProps) {
    const { redirectUrl } = this.props
    const isLoggingOut = prevProps.isAuthed && !this.props.isAuthed
    const isLoggingIn = !prevProps.isAuthed && this.props.isAuthed

    if (isLoggingIn) {
      this.context.router.push(redirectUrl)
    } else if (isLoggingOut) {
      // clean up work
      this.context.router.push('/auth')
    }
  },

  goToAddContact () {
    amplitude.getInstance().logEvent(analytics.BR_OL_ADD_CONTACT_COMMAND_BAR_CLICKED)
    this.props.resetAddNewContact()
    this.context.router.push('/add-contact')
  },

  goToFilterContacts () {
    amplitude.getInstance().logEvent(analytics.BR_OL_FILTER_CONTACTS_COMMAND_BAR_CLICKED)
    this.props.resetFilterContacts()
    this.context.router.push('/filter-contacts')
  },

  gotToSearchContacts() {
    amplitude.getInstance().logEvent(analytics.BR_OL_SEARCH_CONTACTS_COMMAND_BAR_CLICKED)
    this.context.router.push('/search')
  },

  getItems () {
    const obj = this
    return [
      {
        key: 'searchContacts',
        name: '',
        icon: 'Search',
        onClick: obj.gotToSearchContacts,
      },
    ]
  },

  getFilteredFarItems () {
    const obj = this
    return [
      {
        key: 'addContact',
        name: '',
        icon: 'Add',
        onClick: obj.goToAddContact,
      },
      {
        key: 'filterContacts',
        name: '',
        icon: 'Filter',
        onClick: obj.goToFilterContacts,
      }
    ]
  },

  render () {
    return this.props.isFetching === true
    ? <div className={centerPage}><Spinner type={ SpinnerType.large } label='Logging in...' /></div>
    : <div className={container}>
        <CommandBar
          isSearchBoxVisible={ false }
          items={this.getItems()}
          farItems={ this.getFilteredFarItems() }
        />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
  },
})

export default connect(
  ({user}) => ({isAuthed: user.isAuthed, isFetching: user.isFetching, redirectUrl: user.redirectUrl}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...addContactActionCreators,
    ...filterContactActionCreators,
  }, dispatch)
)(MainContainer)
