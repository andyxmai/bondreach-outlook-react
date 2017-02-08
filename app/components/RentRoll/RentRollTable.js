import React, { PropTypes } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default function ExpenseTable (props) {
  var expenses = [{
      id: 1,
      tenant: 'DoorDash',
      suite: '400',
      type: 'NNN',
      status: 'Contract',
      size: '23,000',
      start_date: '10/25/2015',
      term: 5,
      base_rent: 10000,
      unit_of_measure: 'dollars'
  }]
  const leaseTypes = [ 'Net', 'Gross' ]
  const statusTypes = [ 'Contract', 'Vacant' ]

  const cellEditProp = {
    mode: 'click',
    blurToSave: true
  }
  const selectRowProp = {
    mode: 'checkbox',
    bgColor: 'pink'
  }

  const options = {
    insertText: 'Add tenant',
    deleteText: 'Delete tenant',
    saveText: 'Add tenant',
    closeText: 'Cancel',
    noDataText: 'No tenants entered yet'
  }

  function numberValidator(value) {
    const nan = isNaN(parseInt(value, 10))
    if (nan) {
      return 'Input must be a integer!'
    }
    return true
  }

  return (
    <div>
      <BootstrapTable data={expenses} cellEdit={ cellEditProp } options={ options }
        insertRow
        deleteRow
        hover
        selectRow={ selectRowProp }
        >
          <TableHeaderColumn width='150' dataField='id' isKey hidden autoValue={ true }>Expense ID</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='tenant' headerAlign='center'>Tenant</TableHeaderColumn>
          <TableHeaderColumn width='75' dataField='suite' headerAlign='center' dataAlign='center'>Suite</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='type' headerAlign='center' dataAlign='center' editable={ { type: 'select', options: { values: leaseTypes } } }>Lease Type</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='status' headerAlign='center' dataAlign='center' editable={ { type: 'select', options: { values: statusTypes } } }>Lease Status</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='size' headerAlign='center' dataAlign='center' editable={ { validator: numberValidator } }>Size</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='start_date' headerAlign='center' dataAlign='center' editable={ { type: 'date' } }>Start Date</TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='term' headerAlign='center' dataAlign='center' editable={ { type: 'number', validator: numberValidator } }>Term</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='base_rent' headerAlign='center' dataAlign='center'>Base Rent</TableHeaderColumn>
          <TableHeaderColumn width='125' dataField='unit_of_measure' headerAlign='center' dataAlign='center'>Unit of Measure</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}
