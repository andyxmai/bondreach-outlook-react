import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap'
import { container, title, toggleContainer, formLabel, tableHeaderContainer, note } from './styles.css'
import { btnGreenInverse, btnGray, btnGrayInverse } from 'sharedStyles/buttons.css'
import { CashflowRowRenderer } from 'components'

export default function CashflowTable (props) {
  const rowHeight = 30
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 1  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <div className={container}>
      {/*<div className={toggleContainer}>
        <div>
          <ButtonGroup>
            <Button bsSize="small" className={btnGrayInverse}>Nominal</Button>
            <Button bsSize="small" className={btnGray}>Per Sqft</Button>
          </ButtonGroup>
        </div>
      </div>*/}
      <div className={tableHeaderContainer}>
        <Button className={btnGreenInverse}>{'Export CSV'}</Button>
      </div>
      <div className={note}>{'*Note:* click on any number in base rental revenue, insurance reimbursements, or insurance costs lines and scroll down to see detailed calculations'}</div>
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        onCellSelected={props.onCellSelected}
        onCellDeSelected={props.onCellDeSelected}
        rowRenderer={CashflowRowRenderer}
        />
    </div>
  )
}
