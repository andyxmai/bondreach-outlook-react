import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters }  from 'react-data-grid-addons'

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
    
    </div>
  )
}
