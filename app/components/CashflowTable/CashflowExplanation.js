import React, { PropTypes } from 'react'
import { container, title, totalContainer } from './styles.css'
import ReactDataGrid from 'react-data-grid'

export default function CashflowExplanation (props) {
  const rowHeight = 35
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }
  return (
    <div className={container}>
      <div className={title}>{'Operating Expenses - Insurance'}</div>
      <ReactDataGrid
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={props.rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        enableCellSelect={true}
        />
      <div className={totalContainer}>
        <div>{'Total: $1,000'}</div>
      </div>
    </div>
  )
}
