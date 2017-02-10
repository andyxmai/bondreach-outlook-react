import React from 'react'
import { CashflowTable } from 'components'
import { CashflowExplanationContainer } from 'containers'

const columns = [  // get it from props
  { key: 'item', name: '', width: 250, locked: true },
  { key: 'year1', name: '01/2017', width: 100,},
  { key: 'year2', name: '01/2018', width: 100,},
  { key: 'year3', name: '01/2019', width: 100,},
  { key: 'year4', name: '01/2020', width: 100,},
  { key: 'year5', name: '01/2021', width: 100,},
]

const rows = [  // get it from props
  {id: 1, item: 'Potential Gross Revenue', bold: true},
  {id: 2, item: 'Base Rental Revenue', year1: '500,000', year2: '515,000', year3: '530,450', year4: '546,364', year5: '562,754', },
  {id: 3, item: 'Total Rental Revenue', year1: '500,000', year2: '515,000', year3: '530,450', year4: '546,364', year5: '562,754', },
  {id: 4, item: ''},
  {id: 5, item: 'Reimbursable Expenses', },
  {id: 6, item: 'Insurance', year1: '', year2: '20', year3: '40', year4: '60', year5: '82', },
  {id: 7, item: 'Total Reimbursable Expenses', year1: '', year2: '20', year3: '40', year4: '60', year5: '82', },
  {id: 8, item: ''},
  {id: 9, item: 'Total Gross Revenue', bold: true, year1: '500,000', year2: '515,020', year3: '530,490', year4: '546,424', year5: '562,836', },
  {id: 10, item: ''},
  {id: 11, item: 'Operating Expenses', bold: true},
  {id: 12, item: 'Insurance', year1: '1,200', year2: '1,400', year3: '1,700', year4: '2,000', year5: '2,200', },
  {id: 13, item: 'Total Expenses', bold: true, year1: '1,200', year2: '1,400', year3: '1,700', year4: '2,000', year5: '2,200', },
  {id: 14, item: ''},
  {id: 15, item: 'Net Operating Income', bold: true, year1: '498,800', year2: '513,620', year3: '528,790', year4: '544,424', year5: '560,636', },
]

const CashflowTableContainer = React.createClass({
  getInitialState () {
    return {
      rowSelected: '',
      colSelected: '',
      showCalculation: false,
    }
  },

  onCellSelected ({ rowIdx, idx }) {  // should be a props function
    console.log('(' + rowIdx + ',' + idx + ')')
    this.setState({rowSelected: rowIdx, colSelected: idx, showCalculation: true})
  },

  onCellDeSelected({ rowIdx, idx }) {
    console.log('deselected')
    console.log('deselect (' + rowIdx + ',' + idx + ')')
    this.setState({showCalculation: false})
  },

  render () {
    return (
      <div>
        <CashflowExplanationContainer
          showCalculation={this.state.showCalculation}
        />
        <CashflowTable
          columns={columns}
          rows={rows}
          onCellSelected={this.onCellSelected}
          onCellDeSelected={this.onCellDeSelected}
        />
      </div>
    )
  }
})

export default CashflowTableContainer
