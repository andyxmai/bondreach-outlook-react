import React from 'react'
import { MLATable } from 'components'

const defaultAssumption = {
  name: '',
  renewalProbilitity: '',
  marketRentNew: '',
  marketRentRenew: '',
  marketRentUnit: '',
  monthsVacant: '',
  tenantImprovementNew: '',
  tenantImprovementRenew: '',
  rentAbatement: '',
  rentChangesAmount: '',
  rentChangesUnit: '',
  reimbursements: '',
  termLength: '',
  termLengthUnit: '',
}

const MLATableContainer = React.createClass({
  getInitialState () {
    return {
      columns: [  // get it from props
        { key: 'name', name: 'Name', editable: false, width: 200 },
        { key: 'renewalProbabilityDisplayName', name: 'Renewal Prob', editable: false },
        { key: 'marketRentDisplayName', name: 'Market Rent (new)', width: 200, editable: false, },
        { key: 'monthsVacant', name: 'Months Vacant', editable: false, },
        { key: 'actions', name: 'Actions', editable: false, },
      ],
      assumptions: [  // get it from props
        {
          id: 0,
          name: 'Market',
          renewalProbabilityDisplayName: '75%',
          marketRentDisplayName: '$2.90 sq/mo',
          monthsVacant: 5,
          actions: 'view/edit',
          renewalProbilitity: 75,
          marketRentNew: 2.85,
          marketRentRenew: 2.85,
          marketRentUnit: 'sqftmonth',
          monthsVacant: 9,
          tenantImprovementNew: 1000,
          tenantImprovementRenew: 500,
          rentAbatement: 0,
          rentChangesAmount: 3,
          rentChangesUnit: 'percentyear',
          reimbursements: 'none',
          termLength: 5,
          termLengthUnit: 'year',
        },
      ],
      isModalOpened: false,
      isEditMode: false,
      selectedAssumptionIndex: '',
      selectedAssumption: {},
    }
  },

  handleAddRow ({ newRowIndex }) {
    console.log('add assumption clicked')
    // Pop that modal!!
    this.setState({
      isModalOpened: true,
      isEditMode: false,
      selectedAssumption: defaultAssumption
    })
  },

  handleAssumptionSaved (assumption) {
    const renewalProbabilityDisplayName = `${assumption.renewalProbilitity}%`
    const marketRentDisplayName = `$${assumption.marketRentNew} ${assumption.marketRentUnit}`
    assumption.renewalProbabilityDisplayName = renewalProbabilityDisplayName
    assumption.marketRentDisplayName = marketRentDisplayName
    assumption.actions = 'view/edit'

    if (this.state.isEditMode) {
      const assumptions = this.state.assumptions
      assumptions[this.state.selectedAssumptionIndex] = assumption

      this.setState({
        assumptions,
        isModalOpened: false,
      })
    } else {  // adding a new assumption
      assumption.id = this.state.assumptions.length
      this.setState({
        assumptions: this.state.assumptions.concat([assumption]),
        isModalOpened: false,
      })
    }
  },

  onCellSelected ({ rowIdx, idx }) {
    this.setState({
      isEditMode: true,
      selectedAssumptionIndex:rowIdx,
      selectedAssumption: this.state.assumptions[rowIdx],
      isModalOpened: true,
    })
  },

  closeModal () {
    this.setState({isModalOpened: false})
  },

  render () {
    return (
      <MLATable
        columns={this.state.columns}
        rows={this.state.assumptions}
        selectedAssumption={this.state.selectedAssumption}
        isModalOpened={this.state.isModalOpened}
        handleAddRow={this.handleAddRow}
        onCellSelected={this.onCellSelected}
        closeModal={this.closeModal}
        handleAssumptionSaved={this.handleAssumptionSaved}
      />
    )
  }
})

export default MLATableContainer
