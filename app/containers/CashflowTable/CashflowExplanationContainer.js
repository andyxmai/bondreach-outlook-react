import React from 'react'
import { CashflowExplanation, CashflowExplanationCalculation, CashflowExplanationCashflows } from 'components'

const explanationColumns = [  // get it from props
  { key: 'name', name: 'Name' },
  { key: 'amount', name: 'Amount',},
  { key: 'fixed', name: '% Fixed',},
  { key: 'inflation', name: '% Inflation',},
]

const explanationRows = [
  {id: 0, name: 'Insurance', amount: '$1,000 annually', fixed: '100', inflation: '2'},
]

const explanationCashflowColumns = [
  { key: 'item', name: '', width: 250, },
  { key: '01/2017', name: '01/2017' },
  { key: '01/2018', name: '01/2018' },
  { key: '01/2019', name: '01/2019' },
  { key: '01/2020', name: '01/2020' },
  { key: '01/2021', name: '01/2021' },
]

const explanationCashflowRows = [
  {id: 1, item: 'Operating Expense', bold: true, },
  {id: 2, item: 'Insurance', '01/2017': '500,000', '01/2018': '515,000', '01/2019': '530,450', '01/2020': '546,364', '01/2021': '562,754', },
  {id: 3, item: ''},
  {id: 4, item: 'Total Expense', bold: true, '01/2017': '500,000', '01/2018': '515,000', '01/2019': '530,450', '01/2020': '546,364', '01/2021': '562,754', },
]

const CashflowExplanationContainer = React.createClass({
  getInitialState () {
    return {
      selectedCashflowExplanationCell: {},
    }
  },

  onCashflowExplanationCellSelected ({ rowIdx, idx }) {  // should be a props function
    console.log('explanation cell selected')
    console.log('(' + rowIdx + ',' + idx + ')')
    this.setState({selectedCashflowExplanationCell: {rowIdx,idx}})
  },

  onCellDeSelected({ rowIdx, idx }) {
  },

  render () {
    return (
      <div>
        { this.props.showCalculation === true
          ? <div>
              <CashflowExplanation
                columns={explanationColumns}
                rows={explanationRows}
                />
              <CashflowExplanationCalculation
                selectedCashflowExplanationCell={this.state.selectedCashflowExplanationCell}
                />
              <CashflowExplanationCashflows
                columns={explanationCashflowColumns}
                rows={explanationCashflowRows}
                onCashflowExplanationCellSelected={this.onCashflowExplanationCellSelected}
                onCellDeSelected={this.onCellDeSelected}
              />
            </div>
          : null
        }
      </div>
    )
  }
})

export default CashflowExplanationContainer
