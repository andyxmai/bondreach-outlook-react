import React, { PropTypes } from 'react'
import { container, title, subtitle } from './styles.css'
import ReactDataGrid from 'react-data-grid'

const { Row } = ReactDataGrid
const RowRenderer = React.createClass({
  propTypes: {
    idx: React.PropTypes.number.isRequired
  },

  setScrollLeft (scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.refs.row.setScrollLeft(scrollBy);
  },

  getRowStyle () {
    return {
      fontWeight: this.getRowWeight(),
      textAlign: 'right',
      border: 'none',
      fontSize: 14,
    }
  },

  getRowWeight () {
    return this.props.row.bold ?  '600' : 'normal'
  },

  render: function () {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div style={this.getRowStyle()}><Row ref="row" {...this.props}/></div>)
  }
})

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
        rowRenderer={RowRenderer}
        />
    </div>
  )
}
