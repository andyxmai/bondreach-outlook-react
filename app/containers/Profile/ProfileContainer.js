import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactActionCreators from 'redux/modules/filterContacts'
import * as teamInvitesActionCreators from 'redux/modules/teamInvites'
import * as userActionCreators from 'redux/modules/user'
import { Profile } from 'components'
import * as analytics from 'helpers/analytics'

const ProfileContainer = React.createClass({
  componentDidMount () {
    this.props.fetchAndHandleProfile()
    amplitude.getInstance().logEvent(analytics.BR_OL_PROFILE)
  },

  handleExportContacts () {
    this.props.resetFilterContacts()
    this.props.downloadContacts()
  },

  handleAddMembersClicked () {
    this.props.fetchAndHandleAddMembers()
    amplitude.getInstance().logEvent(analytics.BR_OL_PROFILE_ADD_MEMBERS_DIALOG_CLICKED)
  },

  handleCloseInvitesDialog () {
    this.props.hideInvitesDialog()
  },

  handleInvitesChanged (values) {
    this.props.handleInvitesChanged(values)
  },

  handleSubmitNewMembersClicked () {
    this.props.handleSubmitNewMembers()
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
        isFetchingInviteCandidates={this.props.isFetchingInviteCandidates}
        isInvitesDialogOpened={this.props.isInvitesDialogOpened}
        inviteSuccessMsg={this.props.inviteSuccessMsg}
        inviteError={this.props.inviteError}
        invites={this.props.invites}
        inviteCandidatesOptions={this.props.inviteCandidatesOptions}
        onAddMembersClicked={this.handleAddMembersClicked}
        onCloseInvitesDialog={this.handleCloseInvitesDialog}
        onInvitesChanged={this.handleInvitesChanged}
        onSubmitNewMembersClicked={this.handleSubmitNewMembersClicked}
      />
    )
  }
})

function mapStateToProps ({user, filterContacts, teamInvites}) {
  return {
    isFetching: user.isFetching,
    error: user.error,
    authedId: user.authedId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    team: user.team,
    isDownloading: filterContacts.isDownloading,
    isFetchingInviteCandidates: teamInvites.isFetchingInviteCandidates,
    isInvitesDialogOpened: teamInvites.isInvitesDialogOpened,
    inviteSuccessMsg: teamInvites.inviteSuccessMsg,
    inviteError: teamInvites.inviteError,
    invites: teamInvites.invites,
    inviteCandidatesOptions: teamInvites.inviteCandidatesOptions,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...filterContactActionCreators,
    ...teamInvitesActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
