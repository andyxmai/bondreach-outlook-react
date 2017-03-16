import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as contactActionCreators from 'redux/modules/contact'
import { EditContact } from 'components'

const EditContactContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    this.props.fetchAndEdiContactSelectOptions()
  },

  componentDidUpdate (prevProps) {
    if (prevProps.updated === false && this.props.updated === true) {
      const contactId = prevProps.id
      this.context.router.push(`/view-contact/${contactId}`)
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

  handleUpdateContactClicked () {
    this.props.handleUpdateContactSubmit()
  },

  render () {
    return (
      <EditContact
        error={this.props.error}
        firstName={this.props.firstName}
        onFirstNameChanged={this.handleFirstNameChanged}
        lastName={this.props.lastName}
        onLastNameChanged={this.handleLastNameChanged}
        email={this.props.email}
        onEmailChanged={this.handleEmailChanged}
        phone={this.props.phone}
        onPhoneChanged={this.handlePhoneChanged}
        company={this.props.company}
        onCompanyChanged={this.handleCompanyChanged}
        investmentTypePreferencesSelected={this.props.investmentTypePreferencesSelected}
        investmentTypePreferenceOptions={this.props.investmentTypePreferenceOptions}
        onTypePreferenceChanged={this.handleTypePreferenceChanged}
        minimumInvestmentSize={this.props.minimumInvestmentSize}
        onInvestmentPreferenceMinSizeChanged={this.handleInvestmentPreferenceMinSizeChanged}
        maximumInvestmentSize={this.props.maximumInvestmentSize}
        onInvestmentPreferenceMaxSizeChanged={this.handleInvestmentPreferenceMaxSizeChanged}
        minimumIrrReturn={this.props.minimumIrrReturn}
        onMinimumIrrReturnChanged={this.handleMinimumIrrReturnChanged}
        maximumIrrReturn={this.props.maximumIrrReturn}
        onMaximumIrrReturnChanged={this.handleMaximumIrrReturnChanged}
        regionPreferencesSelected={this.props.regionPreferencesSelected}
        regionPreferenceOptions={this.props.regionPreferenceOptions}
        onRegionPreferenceChanged={this.handleRegionPreferenceChanged}
        onUpdateContactClicked={this.handleUpdateContactClicked}
      />
    )
  }
})

function mapStateToProps ({contact}) {
  return {
    isFetching: contact.isFetching,
    id: contact.id,
    error: contact.error,
    firstName: contact.firstName,
    lastName: contact.lastName,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    minimumInvestmentSize: contact.minimumInvestmentSize,
    maximumInvestmentSize: contact.maximumInvestmentSize,
    minimumIrrReturn: contact.minimumIrrReturn,
    maximumIrrReturn: contact.maximumIrrReturn,
    investmentTypePreferences: contact.investmentTypePreferences,
    investmentTypePreferenceOptions: contact.investmentTypePreferenceOptions,
    investmentTypePreferencesSelected: contact.investmentTypePreferencesSelected,
    regionPreferences: contact.regionPreferences,
    regionPreferenceOptions: contact.regionPreferenceOptions,
    regionPreferencesSelected: contact.regionPreferencesSelected,
    upcomingFollowUp: contact.upcomingFollowUp,
    notes: contact.notes,
    isNotesPanelOpened: contact.isNotesPanelOpened,
    isSavingNotes: contact.isSavingNotes,
    notesSavedSuccessMsg: contact.notesSavedSuccessMsg,
    notesSavedErrorMsg: contact.notesSavedErrorMsg,
    updated: contact.updated,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(contactActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContactContainer)
