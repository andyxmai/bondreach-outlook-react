import React from 'react'
import { NewMLAModal } from 'components'

const NewMLAModalContainer = React.createClass({
  getInitialState () {  // fix this when moving to redux
    return {
      name: this.props.selectedAssumption.name,
      renewalProbilitity: this.props.selectedAssumption.renewalProbilitity,
      marketRentNew: this.props.selectedAssumption.marketRentNew,
      marketRentRenew: this.props.selectedAssumption.marketRentRenew,
      marketRentUnit: this.props.selectedAssumption.marketRentUnit,
      monthsVacant: this.props.selectedAssumption.monthsVacant,
      tenantImprovementNew: this.props.selectedAssumption.tenantImprovementNew,
      tenantImprovementRenew: this.props.selectedAssumption.tenantImprovementRenew,
      rentAbatement: this.props.selectedAssumption.rentAbatement,
      rentChangesAmount: this.props.selectedAssumption.rentChangesAmount,
      rentChangesUnit: this.props.selectedAssumption.rentChangesUnit,
      reimbursements: this.props.selectedAssumption.reimbursements,
      termLength: this.props.selectedAssumption.termLength,
      termLengthUnit: this.props.selectedAssumption.termLengthUnit,
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      name: nextProps.selectedAssumption.name,
      renewalProbilitity: nextProps.selectedAssumption.renewalProbilitity,
      marketRentNew: nextProps.selectedAssumption.marketRentNew,
      marketRentRenew: nextProps.selectedAssumption.marketRentRenew,
      marketRentUnit: nextProps.selectedAssumption.marketRentUnit,
      monthsVacant: nextProps.selectedAssumption.monthsVacant,
      tenantImprovementNew: nextProps.selectedAssumption.tenantImprovementNew,
      tenantImprovementRenew: nextProps.selectedAssumption.tenantImprovementRenew,
      rentAbatement: nextProps.selectedAssumption.rentAbatement,
      rentChangesAmount: nextProps.selectedAssumption.rentChangesAmount,
      rentChangesUnit: nextProps.selectedAssumption.rentChangesUnit,
      reimbursements: nextProps.selectedAssumption.reimbursements,
      termLength: nextProps.selectedAssumption.termLength,
      termLengthUnit: nextProps.selectedAssumption.termLengthUnit,
    })
  },

  handleNameChanged (e) {
    this.setState({name: e.target.value})
  },

  handleRenewalProbabilityChanged (e) {
    this.setState({renewalProbilitity: e.target.rawValue})
  },

  handleMarketRentNewChanged (e) {
    this.setState({marketRentNew: e.target.rawValue})
  },

  handleMarketRentRenewChanged (e) {
    this.setState({marketRentRenew: e.target.rawValue})
  },

  handleMarketRentUnitChanged (selection) {
    this.setState({marketRentUnit: selection.value})
  },

  handleMonthsVacantChanged (e) {
    this.setState({monthsVacant: e.target.rawValue})
  },

  handleTenantImprovementNewChanged (e) {
    this.setState({tenantImprovementNew: e.target.rawValue})
  },

  handleTenantImprovementRenewChanged (e) {
    this.setState({tenantImprovementRenew: e.target.rawValue})
  },

  handleRentAbatementChanged (e) {
    this.setState({rentAbatement: e.target.rawValue})
  },

  handleRentChangesAmountChanged (e) {
    this.setState({rentChangesAmount: e.target.rawValue})
  },

  handleRentChangesUnitChanged (selection) {
    this.setState({rentChangesUnit: selection.value})
  },

  handleReimbursementsChanged (selection) {
    this.setState({reimbursements: selection.value})
  },

  handleTermLengthChanged (e) {
    this.setState({termLength: e.target.rawValue})
  },

  handleTermLengthUnitChanged (selection) {
    this.setState({termLengthUnit: selection.value})
  },

  handleSubmit () {
    this.props.handleAssumptionSaved(this.state)
  },

  render () {
    return (
      <NewMLAModal
        isModalOpened={this.props.isModalOpened}
        closeModal={this.props.closeModal}
        name={this.state.name}
        renewalProbilitity={this.state.renewalProbilitity}
        marketRentNew={this.state.marketRentNew}
        marketRentRenew={this.state.marketRentRenew}
        marketRentUnit={this.state.marketRentUnit}
        monthsVacant={this.state.monthsVacant}
        tenantImprovementNew={this.state.tenantImprovementNew}
        tenantImprovementRenew={this.state.tenantImprovementRenew}
        rentAbatement={this.state.rentAbatement}
        rentChangesAmount={this.state.rentChangesAmount}
        rentChangesUnit={this.state.rentChangesUnit}
        reimbursements={this.state.reimbursements}
        termLength={this.state.termLength}
        termLengthUnit={this.state.termLengthUnit}
        handleNameChanged={this.handleNameChanged}
        handleRenewalProbabilityChanged={this.handleRenewalProbabilityChanged}
        handleMarketRentNewChanged={this.handleMarketRentNewChanged}
        handleMarketRentRenewChanged={this.handleMarketRentRenewChanged}
        handleMarketRentUnitChanged={this.handleMarketRentUnitChanged}
        handleMonthsVacantChanged={this.handleMonthsVacantChanged}
        handleTenantImprovementNewChanged={this.handleTenantImprovementNewChanged}
        handleTenantImprovementRenewChanged={this.handleTenantImprovementRenewChanged}
        handleRentAbatementChanged={this.handleRentAbatementChanged}
        handleRentChangesAmountChanged={this.handleRentChangesAmountChanged}
        handleRentChangesUnitChanged={this.handleRentChangesUnitChanged}
        handleReimbursementsChanged={this.handleReimbursementsChanged}
        handleTermLengthChanged={this.handleTermLengthChanged}
        handleTermLengthUnitChanged={this.handleTermLengthUnitChanged}
        handleSubmit={this.handleSubmit}
      />
    )
  }
})

export default NewMLAModalContainer
