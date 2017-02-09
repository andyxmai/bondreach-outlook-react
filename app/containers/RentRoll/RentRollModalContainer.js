import React from 'react'
import { RentRollModal } from 'components'

const RentRollModalContainer = React.createClass({
  getInitialState () {
    return {
      reimbursementsType: '',
      reimbursements: '',
      leasingCostTenantImprovements: '',
      leasingCostTenantImprovementsUnit: '',
      leasingCostLeasingCommissions: '',
      leasingCostLeasingCommissionsUnit: '',
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      reimbursementsType: nextProps.selectedTenant.reimbursementsType,
      reimbursements: nextProps.selectedTenant.reimbursements,
      leasingCostTenantImprovements: nextProps.selectedTenant.leasingCostTenantImprovements,
      leasingCostTenantImprovementsUnit: nextProps.selectedTenant.leasingCostTenantImprovementsUnit,
      leasingCostLeasingCommissions: nextProps.selectedTenant.leasingCostLeasingCommissions,
      leasingCostLeasingCommissionsUnit: nextProps.selectedTenant.leasingCostLeasingCommissionsUnit,
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

  handleTenantImprovementsChanged (e) {
    this.setState({leasingCostTenantImprovements: e.target.rawValue})
  },

  handleTenantImprovementsUnitChanged (selection) {
    this.setState({leasingCostTenantImprovementsUnit: selection.value})
  },

  handleLeasingCommissionsAmountChanged (e) {
    this.setState({leasingCostLeasingCommissions: e.target.rawValue})
  },

  handleLeasingCommissionsUnitChanged (selection) {
    this.setState({leasingCostLeasingCommissionsUnit: selection.value})
  },

  handleLeasingCostsSubmission () {
    this.props.handleLeasingCostsSubmission({
      leasingCostTenantImprovements: this.state.leasingCostTenantImprovements,
      leasingCostTenantImprovementsUnit: this.state.leasingCostTenantImprovementsUnit,
      leasingCostLeasingCommissions: this.state.leasingCostLeasingCommissions,
      leasingCostLeasingCommissionsUnit: this.state.leasingCostLeasingCommissionsUnit,
    })
  },

  render () {
    return (
      <RentRollModal
        reimbursements={this.state.reimbursements}
        reimbursementsType={this.state.reimbursementsType}
        leasingCostTenantImprovements={this.state.leasingCostTenantImprovements}
        leasingCostTenantImprovementsUnit={this.state.leasingCostTenantImprovementsUnit}
        leasingCostLeasingCommissions={this.state.leasingCostLeasingCommissions}
        leasingCostLeasingCommissionsUnit={this.state.leasingCostLeasingCommissionsUnit}
        tenantName={this.props.selectedTenant.name}
        selectedColumnKey={this.props.selectedColumnKey}
        isModalOpened={this.props.isModalOpened}
        handleAddRow={this.handleAddRow}
        onCellSelected={this.onCellSelected}
        closeModal={this.props.closeModal}
        handleReimbursementsChanged={this.handleReimbursementsChanged}
        handleReimbursementsTypeChanged={this.handleReimbursementsTypeChanged}
        handleReimbursementsSubmission={this.handleReimbursementsSubmission}
        handleTenantImprovementsChanged={this.handleTenantImprovementsChanged}
        handleTenantImprovementsUnitChanged={this.handleTenantImprovementsUnitChanged}
        handleLeasingCommissionsAmountChanged={this.handleLeasingCommissionsAmountChanged}
        handleLeasingCommissionsUnitChanged={this.handleLeasingCommissionsUnitChanged}
        handleLeasingCostsSubmission={this.handleLeasingCostsSubmission}
      />
    )
  }
})

export default RentRollModalContainer
