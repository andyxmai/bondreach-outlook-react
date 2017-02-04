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
    mode: 'checkbox'
  }

  const options = {
    insertText: 'Add expense',
    deleteText: 'Delete expense',
    saveText: 'Add expense',
    closeText: 'Cancel'
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
        selectRow={ selectRowProp }>
          <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='acct'>Acct Code</TableHeaderColumn>
          <TableHeaderColumn dataField='amount' editable={ { validator: numberValidator } }>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='units'>Units</TableHeaderColumn>
          <TableHeaderColumn dataField='area'>Area</TableHeaderColumn>
          <TableHeaderColumn dataField='frequency' editable={ { type: 'select', options: { values: frequencyTypes } } }>Frequency</TableHeaderColumn>
          <TableHeaderColumn dataField='fixed' editable={ { type: 'number' } }>% Fixed</TableHeaderColumn>
          <TableHeaderColumn dataField='inflation'>Inflation</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}
