import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ViewContact } from 'components'
import * as contactActionCreators from 'redux/modules/contact'

const ViewContactContainer = React.createClass({
  componentDidMount () {
    const contactId = this.props.routeParams.contactId
    this.props.fetchAndHandleContactWithId(contactId)
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  goBack () {
    this.context.router.goBack()
  },

  handleShowNotes () {
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
        upcomingFollowUp={this.props.upcomingFollowUp}
        notes={this.props.notes}
        isNotesPanelOpened={this.props.isNotesPanelOpened}
        onShowNotes={this.handleShowNotes}
        onHideNotes={this.handleHideNotes}
        onSaveNotes={this.handleSaveNotes}
        onNotesChanged={this.handleNotesChanged}
        isSavingNotes={this.props.isSavingNotes}
        notesSavedSuccessMsg={this.props.notesSavedSuccessMsg}
        notesSavedErrorMsg={this.props.notesSavedErrorMsg}
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
    upcomingFollowUp: contact.upcomingFollowUp,
    notes: contact.notes,
    isNotesPanelOpened: contact.isNotesPanelOpened,
    isSavingNotes: contact.isSavingNotes,
    notesSavedSuccessMsg: contact.notesSavedSuccessMsg,
    notesSavedErrorMsg: contact.notesSavedErrorMsg,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(contactActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewContactContainer)
