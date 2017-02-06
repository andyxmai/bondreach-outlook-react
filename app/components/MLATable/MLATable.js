import React, { PropTypes } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default function MLATable (props) {
  var expenses = [{
      id: 1,
      name: 'Market',
      renewal: '75%',
  }]
  const frequencyTypes = [ 'Yearly', 'Monthly' ]

  const options = {
    insertText: 'Add assumption',
    saveText: 'Add assumption',
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
      <BootstrapTable data={expenses} options={ options }
        insertRow
        bordered={ false }
        >
          <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='renewal' editable={ { validator: numberValidator } }>Renewal Probability</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}
