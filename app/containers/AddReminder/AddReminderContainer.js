import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddReminder } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import * as followUpActionCreators from 'redux/modules/followUp'

const AddReminderContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    const contactId = this.props.routeParams.contactId
    this.props.addFollowUpContactId(contactId)
  },

  handleSelectBeginDate (beginDataObj) {
    this.props.handleBeginDateChange(beginDataObj)
  },

  handleFrequencyChange (item) {
    this.props.changeFollowUpFrequency(item.key)
  },

  handleAddToCalendar () {
    this.props.addAndHandleFollowUp(() => {
      this.context.router.push(`/view-contact/${this.props.contact}`)
    })
  },

  goToContact () {
    this.context.router.push(`/view-contact/${this.props.contact}`)
  },

  render () {
    return (
      <AddReminder
        isFetching={this.props.isFetching}
        error={this.props.error}
        beginDataObj={this.props.beginDataObj}
        frequency={this.props.frequency}
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
    beginDataObj: followUp.beginDataObj,
    frequency: followUp.frequency,
    isActive: followUp.isActive,
    contact: followUp.contact,  // this is actually the ID
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(followUpActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddReminderContainer)
