import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Toolbar }  from 'react-data-grid-addons'
import { RentRollModalContainer } from 'containers'


export default function RentRollTable (props) {
  const rowHeight = 45
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <div>
      <RentRollModalContainer
        isModalOpened={props.isModalOpened}
        closeModal={props.closeModal}
        handleReimbursementsSubmission={props.handleReimbursementsSubmission}
        handleLeasingCostsSubmission={props.handleLeasingCostsSubmission}
        selectedTenant={props.selectedTenant}
        selectedColumnKey={props.selectedColumnKey}
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
