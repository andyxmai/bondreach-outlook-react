import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, ButtonGroup } from 'react-bootstrap'
import { container, title, toggleContainer, formLabel, tableHeaderContainer, note, toggleGroup } from './styles.css'
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
      { props.hideButton === true
        ? null
        : <div>
            <div className={tableHeaderContainer}>
              {props.useNominal
                ? <ButtonGroup className={toggleGroup}>
                    <Button className={btnGrayInverse} onClick={props.handleNominalToggle}>Nominal</Button>
                    <Button className={btnGray} onClick={props.handleSqftToggle}>Per Sqft</Button>
                  </ButtonGroup>
                : <ButtonGroup className={toggleGroup}>
                    <Button className={btnGray} onClick={props.handleNominalToggle}>Nominal</Button>
                    <Button className={btnGrayInverse} onClick={props.handleSqftToggle}>Per Sqft</Button>
                  </ButtonGroup>
              }
              <form method="get" action='cashflows.xlsx'>
                <Button type='submit' className={btnGreenInverse}>{'Export Excel'}</Button>
              </form>
            </div>
            <div className={note}>{'*Note:* click on any number in base rental revenue, insurance reimbursements, or insurance costs lines and scroll down to see detailed calculations'}</div>
          </div>
      }
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
