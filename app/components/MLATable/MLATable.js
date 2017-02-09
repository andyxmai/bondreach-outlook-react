import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Toolbar }  from 'react-data-grid-addons'
import { NewMLAModalContainer } from 'containers'

export default function MLATable (props) {
  const rowHeight = 35
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 1  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }
  return (
    <div>
      <NewMLAModalContainer
        isModalOpened={props.isModalOpened}
        closeModal={props.closeModal}
        handleAssumptionSaved={props.handleAssumptionSaved}
        selectedAssumption={props.selectedAssumption}
      />
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        enableCellSelect={true}
        onCellSelected={props.onCellSelected}
        toolbar={<Toolbar onAddRow={props.handleAddRow}/>}
        />
    </div>
  )
}
