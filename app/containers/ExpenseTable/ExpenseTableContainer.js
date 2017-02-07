import React from 'react'
import { ExpenseTable } from 'components'

const ExpenseTableContainer = React.createClass({
  getInitialState () {
    return {
      columns: [  // get it from props
        { key: 'name', name: 'Name', editable: true },
        { key: 'acctCode', name: 'Acct Code', editable: true, width: 100 },
        { key: 'amount', name: 'Amount', editable: false, },
        { key: 'fixed', name: '% Fixed', editable: true, },
        { key: 'inflation', name: 'Inflation (%)', editable: true, },
      ],
      rows: [  // get it from props
        {id: 0, name: 'Insurance', amount: '$40,000 annually', fixed: 100, inflation: 2},
      ],
      amountModalOpened: true,
    }
  },

  handleRowUpdated ({ rowIdx, updated }) {
    Object.assign(this.state.rows[rowIdx], updated)
  },

  handleAddRow ({ newRowIndex }) {
    const newRow = {
      id: newRowIndex,
      name: '',
      amount: '',
      fixed: '',
      inflation: '',
    }
    this.setState({rows: this.state.rows.concat([newRow])});
  },

  onCellSelected ({ rowIdx, idx }) {
    if (this.state.columns[idx].key === 'amount') {  // amount selected
      console.log('amount selected')
      this.setState({amountModalOpened: true})
    }
  },

  closeModal () {
    this.setState({amountModalOpened: false})
  },

  render () {
    return (
      <ExpenseTable
        columns={this.state.columns}
        rows={this.state.rows}
        amountModalOpened={this.state.amountModalOpened}
        handleAddRow={this.handleAddRow}
        handleRowUpdated={this.handleRowUpdated}
        onCellSelected={this.onCellSelected}
        closeModal={this.closeModal}
        />
    )
  }
})

export default ExpenseTableContainer
