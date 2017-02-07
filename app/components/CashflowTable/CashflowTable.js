import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Form, FormGroup, FormControl, ControlLabel, Col, Panel, Button } from 'react-bootstrap'
import { container, title, toggleContainer, formLabel, tableHeaderContainer } from './styles.css'
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
      fontWeight: this.getRowWeight()
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

export default function Home (props) {
  const columns = [  // get it from props
    { key: 'item', name: '', width: 250, locked: true },
    { key: 'year1', name: '01/2018', width: 100 },
    { key: 'year2', name: '01/2019', width: 100 },
    { key: 'year3', name: '01/2020', width: 100 },
    { key: 'year4', name: '01/2021', width: 100 },
    { key: 'year5', name: '01/2022', width: 100 },
    { key: 'year6', name: '01/2023', width: 100 },
    { key: 'year7', name: '01/2024', width: 100 },
    { key: 'year8', name: '01/2025', width: 100 },
    { key: 'year9', name: '01/2026', width: 100 },
    { key: 'year10', name: '01/2027', width: 100 },
  ]

  const rows = [  // get it from props
    {id: 1, item: 'Potential Gross Revenue', bold: true},
    {id: 2, item: 'Rental Revenue', year1: 5000000, year2: 5000000, year3: 5000000, year4: 5000000, year5: 5000000, year6: 5000000, year7: 5000000},
    {id: 3, item: 'Vacancy', year1: 700000, year2: 700000, year3: 700000, year4: 700000, year5: 700000, year6: 700000, year7: 700000},
    {id: 4, item: 'Total Gross Revenue', bold: true, year1: 4300000, year2: 4300000, year3: 4300000, year4: 4300000, year5: 4300000, year6: 4300000, year7: 4300000},
    {id: 5, item: 'Operating Expenses', bold: true},
    {id: 6, item: 'Insurance', year1: 10000, year2: 10000, year3: 10000, year4: 10000, year5: 10000, year6: 10000, year7: 10000},
    {id: 7, item: 'Taxes', year1: 40000, year2: 40000, year3: 40000, year4: 40000, year5: 40000, year6: 40000, year7: 40000},
    {id: 8, item: 'Total Expenses', bold: true, year1: 50000, year2: 50000, year3: 50000, year4: 50000, year5: 50000, year6: 50000, year7: 50000},
    {id: 9, item: 'Net Operating Income', bold: true, year1: 4250000, year2: 4250000, year3: 4250000, year4: 4250000, year5: 4250000, year6: 4250000, year7: 4250000},
  ]

  const rowHeight = 35
  function getHeight () {
    return rowHeight * (rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return rows[i]
  }

  function onCellSelected ({ rowIdx, idx }) {  // should be a props function
    console.log('(' + rowIdx + ',' + idx + ')')
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
        <ReactDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rows.length}
          rowHeight={rowHeight}
          minHeight={getHeight()}
          enableCellSelect={true}
          onCellSelected={onCellSelected}
          rowRenderer={RowRenderer}
          />
        </Panel>
    </div>
  )
}
