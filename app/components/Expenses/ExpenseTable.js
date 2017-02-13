import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters }  from 'react-data-grid-addons'
import { NewExpenseAmountModalContainer } from 'containers'

export default function ExpenseTable (props) {
  const rowHeight = 45
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <div>
      <NewExpenseAmountModalContainer
        amountModalOpened={props.amountModalOpened}
        closeModal={props.closeModal}
        selectedExpenseName={props.selectedExpenseName}
        handleDetailAdded={props.handleDetailAdded}
      />
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        enableCellSelect={true}
        onCellSelected={props.onCellSelected}
        onRowUpdated={props.handleRowUpdated}
        toolbar={<Toolbar onAddRow={props.handleAddRow}/>}
        />
    </div>
  )
}
