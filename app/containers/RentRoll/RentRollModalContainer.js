import React from 'react'
import { RentRollModal } from 'components'

const RentRollModalContainer = React.createClass({
  getInitialState () {
    return {
      reimbursementsType: '',
      reimbursements: '',
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      reimbursementsType: nextProps.reimbursementsType,
      reimbursements: nextProps.reimbursements,
    })
  },

  handleReimbursementsTypeChanged (selection) {
    this.setState({reimbursementsType: selection.value})
  },

  handleReimbursementsChanged (e) {
    console.log(e.target.rawValue)
    this.setState({reimbursements: e.target.rawValue})
  },

  handleReimbursementsSubmission () {
    this.props.handleReimbursementsSubmission({
      reimbursementsType: this.state.reimbursementsType,
      reimbursements: this.state.reimbursements,
    })
  },

  render () {
    return (
      <RentRollModal
        reimbursements={this.state.reimbursements}
        reimbursementsType={this.state.reimbursementsType}
        isModalOpened={this.props.isModalOpened}
        handleAddRow={this.handleAddRow}
        onCellSelected={this.onCellSelected}
        closeModal={this.props.closeModal}
        handleReimbursementsChanged={this.handleReimbursementsChanged}
        handleReimbursementsTypeChanged={this.handleReimbursementsTypeChanged}
        handleReimbursementsSubmission={this.handleReimbursementsSubmission}
      />
    )
  }
})

export default RentRollModalContainer
