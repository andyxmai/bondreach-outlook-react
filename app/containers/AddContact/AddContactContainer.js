import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddContact } from 'components'
import * as addContactActionCreators from 'redux/modules/addContact'
import { formatToMultiSelectOptions, formatOutlookContactNotes } from 'helpers/utils'
import { createOutlookContact } from 'common/EWS'
import * as analytics from 'helpers/analytics'

const AddContactContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    this.props.fetchAndAddContactSelectOptions()
    const populate = this.props.location.query.populate ? true : false
    if (populate) {  // populate the fields with the current email item
      this.props.loadAndStoreContactInfo()
    }
    this.props.addCreator()
  },

  componentDidUpdate(prevProps) {
    if (this.props.addedContactId !== '' && prevProps.addedContactId === '') {
      const addedContactId = this.props.addedContactId
      createOutlookContact(this.props.addedContact)
      this.context.router.push(`/add-reminder/${addedContactId}`)
    }
  },

  handleFirstNameChanged (value) {
    this.props.handleFirstNameChanged(value)
  },

  handleLastNameChanged (value) {
    this.props.handleLastNameChanged(value)
  },

  handleEmailChanged (value) {
    this.props.handleEmailChanged(value)
  },

  handlePhoneChanged (value) {
    this.props.handlePhoneChanged(value)
  },

  handleCompanyChanged (value) {
    this.props.handleCompanyChanged(value)
  },

  handleInvestmentPreferenceMinSizeChanged (item) {
    this.props.handleMinSizePreferenceChanged(item.value)
  },

  handleInvestmentPreferenceMaxSizeChanged (item) {
    this.props.handleMaxSizePreferenceChanged(item.value)
  },

  handleInvestmentPreferenceSizeTypeChanged (item) {
    this.props.handleInvestmentPreferenceSizeTypeChanged(item.value)
  },

  handleMinimumIrrReturnChanged (e) {
    this.props.handleMinimumIrrReturnChanged(e.target.rawValue)
  },

  handleMaximumIrrReturnChanged (e) {
    this.props.handleMaximumIrrReturnChanged(e.target.rawValue)
  },

  handleTypePreferenceChanged (value) {
    this.props.handleTypePreferenceChanged(value)
  },

  handleRegionPreferenceChanged (value) {
    this.props.handleRegionPreferenceChanged(value)
  },

  handleNotesChanged (value) {
    this.props.handleNotesChanged(value)
  },

  handleRemoveErrorMsg () {
    this.props.removeAddContactErrorMsg()
  },

  handleAddContactClicked () {
    this.props.handleAddContactSubmit()
  },

  handleShowNotes () {
    this.props.showNotesPanel()
  },

  handleHideNotes () {
    this.props.hideNotesPanel()
  },

  handleAutoFillClicked () {
    amplitude.getInstance().logEvent(analytics.BR_OL_ADD_CONTACT_AUTOFILL_CLICKED)
    this.props.loadAndStoreContactInfo()
  },

  render () {
    return (
      <AddContact
        regionPreferenceOptions={this.props.regionPreferenceOptions}
        investmentTypePreferenceOptions={this.props.investmentTypePreferenceOptions}
        isLoading={this.props.isLoading}
        error={this.props.error}
        successMsg={this.props.successMsg}
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        email={this.props.email}
        phone={this.props.phone}
        company={this.props.company}
        investmentTypePreferencesSelected={this.props.investmentTypePreferencesSelected}
        minimumInvestmentSize={this.props.minimumInvestmentSize}
        maximumInvestmentSize={this.props.maximumInvestmentSize}
        investmentType={this.props.investmentType}
        minimumIrrReturn={this.props.minimumIrrReturn}
        maximumIrrReturn={this.props.maximumIrrReturn}
        regionPreferencesSelected={this.props.regionPreferencesSelected}
        onFirstNameChanged={this.handleFirstNameChanged}
        onLastNameChanged={this.handleLastNameChanged}
        onEmailChanged={this.handleEmailChanged}
        onPhoneChanged={this.handlePhoneChanged}
        onCompanyChanged={this.handleCompanyChanged}
        onInvestmentPreferenceMinSizeChanged={this.handleInvestmentPreferenceMinSizeChanged}
        onInvestmentPreferenceMaxSizeChanged={this.handleInvestmentPreferenceMaxSizeChanged}
        onInvestmentPreferenceSizeTypeChanged={this.handleInvestmentPreferenceSizeTypeChanged}
        onMinimumIrrReturnChanged={this.handleMinimumIrrReturnChanged}
        onMaximumIrrReturnChanged={this.handleMaximumIrrReturnChanged}
        onTypePreferenceChanged={this.handleTypePreferenceChanged}
        onRegionPreferenceChanged={this.handleRegionPreferenceChanged}
        onAddContactClicked={this.handleAddContactClicked}
        onAutoFillClicked={this.handleAutoFillClicked}
        onRemoveErrorMsg={this.handleRemoveErrorMsg}
        notes={this.props.notes}
        isNotesPanelOpened={this.props.isNotesPanelOpened}
        onShowNotes={this.handleShowNotes}
        onHideNotes={this.handleHideNotes}
        onNotesChanged={this.handleNotesChanged}
      />
    )
  }
})

function mapStateToProps ({addContact}) {
  return {
    isLoading: addContact.isLoading,
    error: addContact.error,
    addedContactId: addContact.addedContactId,
    addedContact: addContact.addedContact,
    successMsg: addContact.successMsg,
    firstName: addContact.firstName,
    lastName: addContact.lastName,
    email: addContact.email,
    phone: addContact.phone,
    company: addContact.company,
    investmentTypePreferences: addContact.investmentTypePreferences,
    investmentTypePreferencesSelected: addContact.investmentTypePreferencesSelected,
    minimumInvestmentSize: addContact.minimumInvestmentSize,
    maximumInvestmentSize: addContact.maximumInvestmentSize,
    investmentType: addContact.investmentType,
    minimumIrrReturn: addContact.minimumIrrReturn,
    maximumIrrReturn: addContact.maximumIrrReturn,
    regionPreferences: addContact.regionPreferences,
    regionPreferencesSelected: addContact.regionPreferencesSelected,
    regionPreferenceOptions: addContact.regionPreferenceOptions,
    investmentTypePreferenceOptions: addContact.investmentTypePreferenceOptions,
    isNotesPanelOpened: addContact.isNotesPanelOpened,
    notes: addContact.notes,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(addContactActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddContactContainer)
