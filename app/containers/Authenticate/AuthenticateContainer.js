import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/user'
import { Authenticate } from 'components'
import apiClient from 'common/ApiClient'
import { parseDisplayName } from 'helpers/utils'

const AuthenticateContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  handleAuth () {
    Office.context.mailbox.getUserIdentityTokenAsync((asyncResult) => {
      const email = Office.context.mailbox.userProfile.emailAddress
      const { firstName, lastName } = parseDisplayName(Office.context.mailbox.userProfile.displayName)
      const token = asyncResult.value
      this.props.fetchAndHandleAuthedUser(token, email, firstName, lastName)
    })
  },

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  }
})

function mapStateToProps ({user}) {
  return {
    isFetching: user.isFetching,
    error: user.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticateContainer)
