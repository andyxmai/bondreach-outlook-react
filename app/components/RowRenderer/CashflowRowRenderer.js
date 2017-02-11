import React from 'react'
import ReactDataGrid from 'react-data-grid'

const { Row } = ReactDataGrid
const CashflowRowRenderer = React.createClass({
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
    return this.props.row.bold ?  'bold' : 'normal'
  },

  render: function () {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div style={this.getRowStyle()}><Row ref="row" {...this.props}/></div>)
  }
})

export default CashflowRowRenderer
