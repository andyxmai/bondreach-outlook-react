import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddReminder } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import * as followUpActionCreators from 'redux/modules/followUp'
import { createAppointment } from 'common/EWS'

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
      var end = this.props.beginDateObj
      end.setHours(this.props.beginDateObj.getHours() + 1)
      const subject = `Follow up - ${this.props.contactObj.firstName} ${this.props.contactObj.lastName}`
      createAppointment(subject, this.props.beginDateObj.toISOString(), end.toISOString(), (asyncResult)=>{})
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
