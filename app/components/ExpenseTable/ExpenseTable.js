import React, { PropTypes } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default function ExpenseTable (props) {
  var expenses = [{
      id: 1,
      name: 'Insurance',
      acct: '010',
      amount: '10,000',
      units: 'dollars',
      area: '',
      frequency: 'Yearly',
      fixed: 100,
      inflation: 3,
  }, {
      id: 2,
      name: "Taxes",
  }]
  const frequencyTypes = [ 'Yearly', 'Monthly' ];

  const cellEditProp = {
    mode: 'click',
    blurToSave: true
  }
  const selectRowProp = {
    mode: 'checkbox',
    bgColor: 'pink'
  }

  const options = {
    insertText: 'Add expense',
    deleteText: 'Delete expense',
    saveText: 'Add expense',
    closeText: 'Cancel',
    noDataText: 'No expenses entered yet'
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
          <TableHeaderColumn dataField='id' isKey hidden autoValue={ true }>Expense ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' headerAlign='center'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='acct' headerAlign='center' dataAlign='center'>Acct Code</TableHeaderColumn>
          <TableHeaderColumn dataField='amount' headerAlign='center' dataAlign='center' editable={ { validator: numberValidator } }>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='units' headerAlign='center' dataAlign='center'>Units</TableHeaderColumn>
          <TableHeaderColumn dataField='area' headerAlign='center' dataAlign='center'>Area</TableHeaderColumn>
          <TableHeaderColumn dataField='frequency' headerAlign='center' dataAlign='center' editable={ { type: 'select', options: { values: frequencyTypes } } }>Frequency</TableHeaderColumn>
          <TableHeaderColumn dataField='fixed' headerAlign='center' dataAlign='center' editable={ { type: 'number' } }>% Fixed</TableHeaderColumn>
          <TableHeaderColumn dataField='inflation' headerAlign='center' dataAlign='center'>Inflation</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}
