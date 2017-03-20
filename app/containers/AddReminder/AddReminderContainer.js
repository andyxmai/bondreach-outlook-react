import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddReminder } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import * as followUpActionCreators from 'redux/modules/followUp'
import { createAppointment } from 'common/EWS'
import { formatAppointmentFields } from 'helpers/utils'
import * as analytics from 'helpers/analytics'

const AddReminderContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    const contactId = this.props.routeParams.contactId
    this.props.fetchAndHandleContact(contactId)
  },

  componentDidUpdate(prevProps) {
    if (this.props.followUpAdded === true && prevProps.followUpAdded === false) {
      const contact = this.props.contact
      //add to Outlook Calendar
      const { subject, body, start, end } = formatAppointmentFields(this.props.beginDateObj, this.props.contactObj)
      createAppointment(subject, body, start, end, (asyncResult)=>{})
      // Redirect to view contact
      this.props.resetFollowUp()
      this.context.router.push(`/view-contact/${contact}`)
    }
  },

  handleSelectBeginDate (beginDateObj) {
    this.props.handleBeginDateChange(beginDateObj)
  },

  handleFrequencyChange (item) {
    this.props.changeFollowUpFrequency(item.key)
  },

  handleAddToCalendar () {
   this.props.addAndHandleFollowUp()
  },

  goToContact () {
    amplitude.getInstance().logEvent(analytics.BR_OL_SKIP_REMINDER_CLICKED)
    this.context.router.push(`/view-contact/${this.props.contact}`)
  },

  render () {
    return (
      <AddReminder
        isFetching={this.props.isFetching}
        error={this.props.error}
        beginDateObj={this.props.beginDateObj}
        frequency={this.props.frequency}
        contactObj={this.props.contactObj}
        onSelectBeginDate={this.handleSelectBeginDate}
        onFrequencyChange={this.handleFrequencyChange}
        onAddToCalendar={this.handleAddToCalendar}
        goToContact={this.goToContact}
      />
    )
  }
})

function mapStateToProps ({followUp}) {
  return {
    isFetching: followUp.isFetching,
    error: followUp.error,
    beginDateObj: followUp.beginDateObj,
    frequency: followUp.frequency,
    isActive: followUp.isActive,
    contact: followUp.contact,  // this is actually the ID
    followUpAdded: followUp.followUpAdded,
    contactObj: followUp.contactObj,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(followUpActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddReminderContainer)
