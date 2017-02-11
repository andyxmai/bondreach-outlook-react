import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Button } from 'react-bootstrap'
import { CashflowRowRenderer } from 'components'
import { cashflowsContainer, title, tableHeaderContainer } from './styles.css'
import { btnGreenInverse } from 'sharedStyles/buttons.css'

export default function TenantCashflowTable (props) {
  const rowHeight = 35
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 1  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <div className={cashflowsContainer}>
      <div className={tableHeaderContainer}>
        <div className={title}>
          {props.title}
        </div>
        <Button className={btnGreenInverse}>{'Export CSV'}</Button>
      </div>
      <div>
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        enableCellSelect={true}
        rowRenderer={CashflowRowRenderer}
        />
      </div>
    </div>
  )
}
