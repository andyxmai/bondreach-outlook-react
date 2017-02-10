import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Form, FormGroup, FormControl, ControlLabel, Col, Panel, Button } from 'react-bootstrap'
import { container, title, toggleContainer, formLabel, tableHeaderContainer, note } from './styles.css'
import { btnGreen, btnGray, btnGrayInverse } from 'sharedStyles/buttons.css'

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
      <div className={toggleContainer}>
        <div>
          <ButtonGroup>
            <Button bsSize="small" className={btnGrayInverse}>Nominal</Button>
            <Button bsSize="small" className={btnGray}>Per Sqft</Button>
          </ButtonGroup>
        </div>
      </div>
      <Panel>
        <div className={tableHeaderContainer}>
          <div className={title}>
            {'Cashflows'}
          </div>
          <Button className={btnGreen}>{'Export CSV'}</Button>
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
          rowRenderer={RowRenderer}
          />
        </Panel>
    </div>
  )
}
