import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactActionCreators from 'redux/modules/filterContacts'
import * as userActionCreators from 'redux/modules/user'
import { Profile } from 'components'

const ProfileContainer = React.createClass({
  componentDidMount () {
    this.props.fetchAndHandleProfile()
  },

  handleExportContacts () {
    this.props.resetFilterContacts()
    this.props.downloadContacts()
  },

  render () {
    return (
      <Profile
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        email={this.props.email}
        team={this.props.team}
        isDownloading={this.props.isDownloading}
        onExportContacts={this.handleExportContacts}
      />
    )
  }
})

function mapStateToProps ({user, filterContacts}) {
  return {
    isFetching: user.isFetching,
    error: user.error,
    authedId: user.authedId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    team: user.team,
    isDownloading: filterContacts.isDownloading,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...filterContactActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
