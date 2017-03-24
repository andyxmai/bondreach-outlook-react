import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ViewContact } from 'components'
import * as contactActionCreators from 'redux/modules/contact'
import * as analytics from 'helpers/analytics'

const ViewContactContainer = React.createClass({
  componentDidMount () {
    const contactId = this.props.routeParams.contactId
    this.props.fetchAndHandleContactWithId(contactId)
    amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT)
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  goBack () {
    this.context.router.goBack()
  },

  handleShowNotes () {
    amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT_OPEN_NOTES)
    this.props.showNotes()
  },

  handleHideNotes () {
    this.props.hideNotes()
  },

  handleSaveNotes () {
    this.props.saveNotes()
  },

  handleNotesChanged (value) {
    this.props.handleNotesChanged(value)
  },

  handleTrackEmailMessage () {
    const messageId = Office.context.mailbox.item.itemId
    this.props.trackeEmailMessage(messageId)
  },

  handleViewItem (e) {
    const itemId = e.target.id
    Office.context.mailbox.displayMessageForm(itemId)
  },

  render () {
    return (
      <ViewContact
        isFetching={this.props.isFetching}
        error={this.props.error}
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        company={this.props.company}
        email={this.props.email}
        phone={this.props.phone}
        investmentTypePreferences={this.props.investmentTypePreferences}
        regionPreferences={this.props.regionPreferences}
        minimumInvestmentSize={this.props.minimumInvestmentSize}
        maximumInvestmentSize={this.props.maximumInvestmentSize}
        minimumIrrReturn={this.props.minimumIrrReturn}
        maximumIrrReturn={this.props.maximumIrrReturn}
        upcomingFollowUp={this.props.upcomingFollowUp}
        correspondences={this.props.correspondences}
        notes={this.props.notes}
        isNotesPanelOpened={this.props.isNotesPanelOpened}
        onShowNotes={this.handleShowNotes}
        onHideNotes={this.handleHideNotes}
        onSaveNotes={this.handleSaveNotes}
        onNotesChanged={this.handleNotesChanged}
        isSavingNotes={this.props.isSavingNotes}
        notesSavedSuccessMsg={this.props.notesSavedSuccessMsg}
        notesSavedErrorMsg={this.props.notesSavedErrorMsg}
        onTrackEmailMessage={this.handleTrackEmailMessage}
        onViewItem={this.handleViewItem}
      />
    )
  }
})

function mapStateToProps ({contact}) {
  return {
    isFetching: contact.isFetching,
    error: contact.error,
    firstName: contact.firstName,
    lastName: contact.lastName,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    investmentTypePreferences: contact.investmentTypePreferences,
    regionPreferences: contact.regionPreferences,
    minimumInvestmentSize: contact.minimumInvestmentSize,
    maximumInvestmentSize: contact.maximumInvestmentSize,
    minimumIrrReturn: contact.minimumIrrReturn,
    maximumIrrReturn: contact.maximumIrrReturn,
    upcomingFollowUp: contact.upcomingFollowUp,
    notes: contact.notes,
    isNotesPanelOpened: contact.isNotesPanelOpened,
    isSavingNotes: contact.isSavingNotes,
    notesSavedSuccessMsg: contact.notesSavedSuccessMsg,
    notesSavedErrorMsg: contact.notesSavedErrorMsg,
    correspondences: contact.correspondences,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(contactActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewContactContainer)
