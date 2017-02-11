import React from 'react'
import { TenantCashflowsHeader, TenantCashflowTable } from 'components'

const columns = [
  { key: 'item', name: '', width: 250, locked: true },
  { key: 'year1', name: '01/2017', },
  { key: 'year2', name: '01/2018', },
  { key: 'year3', name: '01/2019', },
  { key: 'year4', name: '01/2020', },
  { key: 'year5', name: '01/2021', },
]

const doordash = {
  title: 'Suite 400 - DoorDash',
  cashflows: [
    {id: 1, item: 'Potential Gross Revenue', bold: true},
    {id: 2, item: 'Base Rental Revenue', year1: '250,000', year2: '257,500', year3: '265,225', year4: '273,182', year5: '281,377', },
    {id: 3, item: 'Total Rental Revenue', year1: '250,000', year2: '257,500', year3: '265,225', year4: '273,182', year5: '281,377', },
    {id: 4, item: '',},
    {id: 5, item: 'Reimbursable Expenses'},
    {id: 6, item: 'Insurance', year1: '', year2: '10', year3: '20', year4: '30', year5: '41', },
    {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '10', year3: '20', year4: '30', year5: '41', },
    {id: 8, item: ''},
    {id: 9, item: 'Total Revenue', bold:true, year1: '250,000', year2: '257,510', year3: '265,245', year4: '273,212', year5: '281,418', },
    {id: 10, item: ''},
    {id: 11, item: 'Operating Expenses', bold: true},
    {id: 12, item: 'Insurance', year1: '1,000', year2: '1,010', year3: '1,020', year4: '1,030', year5: '1,041', },
    {id: 13, item: 'Total Expenses', year1: '1,000', year2: '1,010', year3: '1,020', year4: '1,030', year5: '1,041', },
    {id: 14, item: ''},
    {id: 15, item: 'Net Operating Income', bold:true, year1: '249,000', year2: '256,500', year3: '264,225', year4: '272,182', year5: '280,377', },
  ]
}

const opendoor = {
  title: 'Suite 800 - OpenDoor',
  cashflows: [
    {id: 1, item: 'Potential Gross Revenue', bold: true},
    {id: 2, item: 'Base Rental Revenue', year1: '250,000', year2: '257,500', year3: '265,225', year4: '273,182', year5: '281,377', },
    {id: 3, item: 'Total Rental Revenue', year1: '250,000', year2: '257,500', year3: '265,225', year4: '273,182', year5: '281,377', },
    {id: 4, item: '',},
    {id: 5, item: 'Reimbursable Expenses'},
    {id: 6, item: 'Insurance', year1: '', year2: '10', year3: '20', year4: '30', year5: '41', },
    {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '10', year3: '20', year4: '30', year5: '41', },
    {id: 8, item: ''},
    {id: 9, item: 'Total Revenue', bold:true, year1: '250,000', year2: '257,510', year3: '265,245', year4: '273,212', year5: '281,418', },
    {id: 10, item: ''},
    {id: 11, item: 'Operating Expenses', bold: true},
    {id: 12, item: 'Insurance', year1: '1,000', year2: '1,010', year3: '1,020', year4: '1,030', year5: '1,041', },
    {id: 13, item: 'Total Expenses', year1: '1,000', year2: '1,010', year3: '1,020', year4: '1,030', year5: '1,041', },
    {id: 14, item: ''},
    {id: 15, item: 'Net Operating Income', bold:true, year1: '249,000', year2: '256,500', year3: '264,225', year4: '272,182', year5: '280,377', },
  ]
}

const TenantCashflowsContainer = React.createClass({
  getInitialState () {
    return {
      selectedTenant: 'all',
      tenantCashflows: [doordash, opendoor],
    }
  },

  handleSelectedTenantChanged (selection) {
    var tenantCashflows = []
    if (selection.value == 'all') {
      tenantCashflows = [doordash, opendoor]
    } else if (selection.value == 'doordash') {
      tenantCashflows = [doordash]
    } else {
      tenantCashflows = [opendoor]
    }

    this.setState({selectedTenant: selection.value, tenantCashflows,})
  },

  render () {
    return (
      <div>
        <TenantCashflowsHeader
          selectedTenant={this.state.selectedTenant}
          handleSelectedTenantChanged={this.handleSelectedTenantChanged}
        />
        { this.state.tenantCashflows.map((tenant) => {
            return (<TenantCashflowTable
              columns={columns}
              rows={tenant.cashflows}
              title={tenant.title}
              key={tenant.title}
            />)
          })
        }
      </div>
    )
  }
})

export default TenantCashflowsContainer
