import React from 'react'
import { CashflowExplanation, CashflowExplanationCalculation, CashflowExplanationCashflows } from 'components'
import { mockExplanationCalculation } from 'config/fixtures'

const CashflowExplanationContainer = React.createClass({
  getInitialState () {
    return {
      selectedCashflowExplanationCell: {},
      showExplanationCalculation: false,
      explanationCalculation: {}
    }
  },

  onCashflowExplanationCellSelected ({ rowIdx, idx }) {  // should be a props function
    const key = '(' + rowIdx + ',' + idx + ')'
    const explanationCalculation = mockExplanationCalculation[this.props.rowSelected][key]
    const showExplanationCalculation = explanationCalculation === undefined ? false : true
    console.log('explanationCalculation:',explanationCalculation)

    this.setState({showExplanationCalculation, explanationCalculation})
  },

  onCellDeSelected({ rowIdx, idx }) {
  },

  render () {
    console.log(this.props.explanationColumns);
    return (
      <div>
        <CashflowExplanation
          columns={this.props.explanationColumns}
          rows={this.props.explanationRows}
          itemData={this.props.itemData}
          />
        <CashflowExplanationCashflows
          columns={this.props.explanationCashflowColumns}
          rows={this.props.explanationCashflowRows}
          onCashflowExplanationCellSelected={this.onCashflowExplanationCellSelected}
          onCellDeSelected={this.onCellDeSelected}
          />
        <CashflowExplanationCalculation
          showExplanationCalculation={this.state.showExplanationCalculation}
          explanationCalculation={this.state.explanationCalculation}
          />
      </div>
    )
  }
})

export default CashflowExplanationContainer
