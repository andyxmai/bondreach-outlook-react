import React from 'react'
import { RentRollTable } from 'components'
import { Editors, Formatters }  from 'react-data-grid-addons'

const { DropDownFormatter } = Formatters
const { DropDownEditor } = Editors

const leaseTypes = [
  { id: 'nnn', value: 'nnn', text: 'NNN', title: 'NNN' },
  { id: 'gross', value: 'gross', text: 'Gross', title: 'Gross' },
  { id: 'modified', value: 'modified', text: 'Modified Gross', title: 'Modified Gross' },
]
const LeaseTypesEditor = <DropDownEditor options={leaseTypes} />
const LeaseTypesFormatter = <DropDownFormatter options={leaseTypes} />

const leaseStatusOptions = [
  { id: 'contract', value: 'contract', text: 'Contract', title: 'Contract' },
  { id: 'speculative', value: 'speculative', text: 'Speculative', title: 'Speculative' },
]
const LeaseStatusEditor = <DropDownEditor options={leaseStatusOptions} />
const LeaseStatusFormatter = <DropDownFormatter options={leaseStatusOptions} />

const baseRentUnitOptions = [
  { id: 'baseRentSqftYear', value: 'baseRentSqftYear', text: '/sqft/year', title: '/sqft/year' },
  { id: 'baseRentSqftMonth', value: 'baseRentSqftMonth', text: '/sqft/month', title: '/sqft/month' },
]
const BaseRentUnitEditor = <DropDownEditor options={baseRentUnitOptions} />
const BaseRentUnitFormatter = <DropDownFormatter options={baseRentUnitOptions} />

const reimbursementsOptions = [
  { id: 'none', value: 'none', text: 'None', title: 'None' },
  { id: 'net', value: 'net', text: 'Net', title: 'Net' },
  { id: 'baseStop', value: 'baseStop', text: 'Base Stop', title: 'Base Stop' },
]
const ReimbursementsEditor = <DropDownEditor options={reimbursementsOptions} />
const ReimbursementsFormatter = <DropDownFormatter options={reimbursementsOptions} />

const marketLeasingAssumptionOptions = [
  { id: 'market', value: 'market', text: 'Market', title: 'Market' },
]
const MarketLeasingAssumptionEditor = <DropDownEditor options={marketLeasingAssumptionOptions} />
const MarketLeasingAssumptionFormatter = <DropDownFormatter options={marketLeasingAssumptionOptions} />

const uponExpirationOptions = [
  { id: 'market', value: 'market', text: 'Market', title: 'Market' },
  { id: 'renew', value: 'renew', text: 'Renew', title: 'Renew' },
]
const UponExpirationEditor = <DropDownEditor options={uponExpirationOptions} />
const UponExpirationFormatter = <DropDownFormatter options={uponExpirationOptions} />

const displayNameMap ={
  'baseYear': 'Base Year',
  'expenseStop': 'Expense Stop'
}

const tableColumns = [  // get it from props; TODO (Andy): create constants for these keys
  { key: 'name', name: 'Tenant', editable: true, width: 200 },
  { key: 'leaseType', name: 'Type', editable: true, width: 150, editor: LeaseTypesEditor, formatter: LeaseTypesFormatter },
  { key: 'leaseStatus', name: 'Status', width: 100, editable: false, modal: true, editor: LeaseStatusEditor, formatter: LeaseStatusFormatter },
  { key: 'size', name: 'Size (sqft)', width: 100, editable: true, },
  { key: 'startDate', name: 'Start Date', width: 100, editable: true, },
  { key: 'term', name: 'Term', width: 100, editable: true, },
  { key: 'baseRent', name: 'Base Rent', width: 100, editable: true, },
  { key: 'baseRentUnit', name: 'Unit', width: 100, editable: true, editor: BaseRentUnitEditor, formatter: BaseRentUnitFormatter },
  { key: 'reimbursementsDisplayName', name: 'Reimbursements', width: 200, editable: false, },
  { key: 'rentAbatement', name: 'Rent Abatement', width: 200, editable: true, },
  { key: 'leasingCostDisplayName', name: 'Leasing Cost', width: 175, editable: false, },
  { key: 'marketingLeasing', name: 'Market Leasing', width: 150, editable: true, editor: MarketLeasingAssumptionEditor, formatter: MarketLeasingAssumptionFormatter },
  { key: 'uponExpiration', name: 'Upon Expiration', width: 250, editable: true, editor: UponExpirationEditor, formatter: UponExpirationFormatter },
]

const mockTenants = [
  {
    id: 0,
    name: 'DoorDash',
    leaseType: 'modified',
    leaseStatus: 'Contract',
    size: 250,
    startDate: '10/2015',
    term: 5,
    baseRent: '1,000',
    baseRentUnit: 'baseRentSqftYear',
    reimbursementsDisplayName: 'Base Stop',
    reimbursementsType: 'baseStop',
    marketingLeasing: 'market',
    uponExpiration: 'market',
  },
  {
    id: 1,
    name: 'OpenDoor',
    leaseType: 'modified',
    leaseStatus: 'Contract',
    size: 250,
    startDate: '10/2015',
    term: 5,
    baseRent: '1,000',
    baseRentUnit: 'baseRentSqftYear',
    reimbursementsDisplayName: 'Base Stop',
    reimbursementsType: 'baseStop',
    marketingLeasing: 'market',
    uponExpiration: 'market',
  },
]

const RentRollTableContainer = React.createClass({
  getInitialState () {
    return {
      columns: tableColumns,
      tenants: mockTenants,
      isModalOpened: false,
      selectedTenantIndex: '',
      selectedColumnKey: '',
      selectedTenant: {},
    }
  },

  handleRowUpdated ({ rowIdx, updated }) {
    Object.assign(this.state.tenants[rowIdx], updated)
  },

  handleAddRow ({ newRowIndex }) {
    const newRow = {
      id: newRowIndex,
      name: '',
      leaseType: '',
      leaseStatus: '',
      size: '',
      startDate: '',
      term: '',
      baseRent: '',
    }
    this.setState({isEditMode: false, tenants: this.state.tenants.concat([newRow])});
  },

  onCellSelected ({ rowIdx, idx }) {
    if (this.state.columns[idx].key === 'leasingCostDisplayName') {  // open leasing cost modal
      this.setState({isModalOpened: true, selectedColumnKey: 'leasingCostDisplayName'})
    } else if (this.state.columns[idx].key === 'reimbursementsDisplayName') {
      this.setState({isModalOpened: true, selectedColumnKey: 'reimbursementsDisplayName'})
    }
    this.setState({
      selectedTenantIndex: rowIdx,
      selectedTenant: this.state.tenants[rowIdx],
    })
  },

  closeModal () {
    this.setState({isModalOpened: false})
  },

  handleReimbursementsSubmission ({reimbursementsType, reimbursements}) {
    const reimbursementsDisplayName = reimbursementsType === 'baseYear' ? 'Base Year' : `${displayNameMap[reimbursementsType]}: ${reimbursements}/sqft`

    { /* TODO (Andy): remove this when switching to redux */ }
    var stateCopy = Object.assign({}, this.state)
    const key = this.state.selectedTenantIndex
    stateCopy.tenants = stateCopy.tenants.slice()
    stateCopy.tenants[key] = Object.assign({}, stateCopy.tenants[key])
    stateCopy.tenants[key].reimbursementsDisplayName = reimbursementsDisplayName
    stateCopy.tenants[key].reimbursementsType = reimbursementsType
    stateCopy.tenants[key].reimbursements = reimbursements
    stateCopy.isModalOpened = false
    this.setState(stateCopy)
  },

  handleLeasingCostsSubmission ({leasingCostTenantImprovements, leasingCostTenantImprovementsUnit, leasingCostLeasingCommissions, leasingCostLeasingCommissionsUnit}) {
    console.log('leasing costs submitted');
    const leasingCostDisplayName = `${leasingCostTenantImprovements}/${leasingCostTenantImprovementsUnit}; ${leasingCostLeasingCommissions} ${leasingCostLeasingCommissionsUnit}`
    { /* TODO (Andy): remove this when switching to redux */ }
    var stateCopy = Object.assign({}, this.state)
    const key = this.state.selectedTenantIndex
    stateCopy.tenants = stateCopy.tenants.slice()
    stateCopy.tenants[key] = Object.assign({}, stateCopy.tenants[key])
    stateCopy.tenants[key].leasingCostDisplayName = leasingCostDisplayName
    stateCopy.tenants[key].leasingCostTenantImprovements = leasingCostTenantImprovements
    stateCopy.tenants[key].leasingCostTenantImprovementsUnit = leasingCostTenantImprovementsUnit
    stateCopy.tenants[key].leasingCostLeasingCommissions = leasingCostLeasingCommissions
    stateCopy.tenants[key].leasingCostLeasingCommissionsUnit = leasingCostLeasingCommissionsUnit
    stateCopy.isModalOpened = false
    this.setState(stateCopy)
  },

  render () {
    return (
      <RentRollTable
        columns={this.state.columns}
        rows={this.state.tenants}
        handleAddRow={this.handleAddRow}
        handleRowUpdated={this.handleRowUpdated}
        onCellSelected={this.onCellSelected}
        isModalOpened={this.state.isModalOpened}
        closeModal={this.closeModal}
        handleReimbursementsSubmission={this.handleReimbursementsSubmission}
        handleLeasingCostsSubmission={this.handleLeasingCostsSubmission}
        selectedTenant={this.state.selectedTenant}
        selectedColumnKey={this.state.selectedColumnKey}
       />
    )
  }
})

export default RentRollTableContainer
