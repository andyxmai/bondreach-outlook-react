import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ViewContact } from 'components'
import * as contactActionCreators from 'redux/modules/contact'
import * as analytics from 'helpers/analytics'
import XMLParser from 'react-xml-parser'
import { checkEmailInOutlookContact, createOutlookContact } from 'common/EWS'

const ViewContactContainer = React.createClass({
  componentDidMount () {
    const contactId = this.props.routeParams.contactId
    this.props.fetchAndHandleContactWithId(contactId)
    amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT)
  },

  componentDidUpdate (prevProps) {
    if (prevProps.email !== this.props.email) {  // contact email changed
      checkEmailInOutlookContact(this.props.email, (asyncResult) => {
        const xml = new XMLParser().parseFromString(asyncResult.value)
        const itemIdElems = xml.getElementsByTagName('t:ItemId')
        var hasOutlookContact = true
        if (!itemIdElems.length) {
          // doesn't have this contact in Outlook
          hasOutlookContact = false
        }
        this.props.changeOutlookContactFlag(hasOutlookContact)
      })
    }
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

  handleTagEmailMessage () {
    const messageId = Office.context.mailbox.item.itemId
    const dateTimeCreated = Office.context.mailbox.item.dateTimeCreated
    this.props.handleTagEmailMessage(messageId, dateTimeCreated.toISOString())
  },

  handleViewItem (e) {
    const itemId = e.target.id
    Office.context.mailbox.displayMessageForm(itemId)
  },

  handleAddContactToOutlook () {
    const contact = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      company: this.props.company,
      phone: this.props.phone,
      investmentTypePreferences: this.props.investmentTypePreferences,
      regionPreferences: this.props.regionPreferences,
      minimumInvestmentSize: this.props.minimumInvestmentSize,
      maximumInvestmentSize: this.props.maximumInvestmentSize,
      minimumIrrReturn: this.props.minimumIrrReturn,
      maximumIrrReturn: this.props.maximumIrrReturn,
      notes: this.props.notes,
    }
    createOutlookContact(contact)
    this.props.changeOutlookContactFlag(true)
    amplitude.getInstance().logEvent(analytics.BR_OL_VIEW_CONTACT_ADD_CONTACT_TO_OUTLOOK)
  },

  render () {
    return (
      <ViewContact
        isFetching={this.props.isFetching}
        error={this.props.error}
        id={this.props.id}
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
        hasOutlookContact={this.props.hasOutlookContact}
        notes={this.props.notes}
        isNotesPanelOpened={this.props.isNotesPanelOpened}
        onShowNotes={this.handleShowNotes}
        onHideNotes={this.handleHideNotes}
        onSaveNotes={this.handleSaveNotes}
        onNotesChanged={this.handleNotesChanged}
        isSavingNotes={this.props.isSavingNotes}
        notesSavedSuccessMsg={this.props.notesSavedSuccessMsg}
        notesSavedErrorMsg={this.props.notesSavedErrorMsg}
        onTagEmailMessage={this.handleTagEmailMessage}
        onViewItem={this.handleViewItem}
        onAddContactToOutlook={this.handleAddContactToOutlook}
      />
    )
  }
})

function mapStateToProps ({contact}) {
  return {
    isFetching: contact.isFetching,
    error: contact.error,
    id: contact.id,
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
    hasOutlookContact: contact.hasOutlookContact,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(contactActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewContactContainer)
