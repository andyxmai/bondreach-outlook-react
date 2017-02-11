import React, { PropTypes } from 'react'
import { container, title, subtitle } from './styles.css'
import ReactDataGrid from 'react-data-grid'
import { CashflowRowRenderer } from 'components'

export default function CashflowExplanationCashflows (props) {
  const rowHeight = 30
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <div className={container}>
      <div className={subtitle}>{'Cashflows'}</div>
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        onCellSelected={props.onCashflowExplanationCellSelected}
        onCellDeSelected={props.onCellDeSelected}
        rowRenderer={CashflowRowRenderer}
        />
    </div>
  )
}
