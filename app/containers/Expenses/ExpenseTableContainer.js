import React from 'react'
import numeral from 'numeral'
import { ExpenseTable } from 'components'

const ExpenseTableContainer = React.createClass({
  getInitialState () {
    return {
      columns: [  // get it from props
        { key: 'name', name: 'Name', editable: true },
        { key: 'acctCode', name: 'Acct Code', editable: true, width: 100 },
        { key: 'amountDisplayName', name: 'Amount', editable: false, modal: true, },
        { key: 'fixed', name: '% Fixed', editable: true, },
        { key: 'inflation', name: 'Inflation (%)', editable: true, },
      ],
      expenses: [  // get it from props
        {id: 0, name: 'Insurance', amountDisplayName: '1,000 annually', fixed: 100, inflation: 2, amountDetail: {}},
      ],
      amountModalOpened: false,
      selectedExpenseIndex: '',
      selectedExpenseName: '',
    }
  },

  handleRowUpdated ({ rowIdx, updated }) {
    Object.assign(this.state.expenses[rowIdx], updated)
  },

  handleAddRow ({ newRowIndex }) {
    const newRow = {
      id: newRowIndex,
      name: '',
      amountDisplayNamme: '',
      fixed: '',
      inflation: '',
      amountDetail: {},
    }
    this.setState({expenses: this.state.expenses.concat([newRow])});
  },

  handleDetailAdded (amountDetail) {
    var amountDisplayName = 'detail'
    if (amountDetail.amountType === 'simple') {
      amountDisplayName = `${numeral(amountDetail.amount).format('0,0')} ${amountDetail.unit} ${amountDetail.frequency}`
    }

    { /* TODO (Andy): remove this when switching to redux */ }
    var stateCopy = Object.assign({}, this.state);
    const key = this.state.selectedExpenseIndex
    stateCopy.expenses = stateCopy.expenses.slice();
    stateCopy.expenses[key] = Object.assign({}, stateCopy.expenses[key]);
    stateCopy.expenses[key].amountDisplayName = amountDisplayName;
    stateCopy.expenses[key].amountDetail = amountDetail;
    this.setState(stateCopy);
  },

  onCellSelected ({ rowIdx, idx }) {
    if (this.state.columns[idx].modal) {  // amount selected
      const selectedExpenseName = this.state.expenses[rowIdx].name
      this.setState({amountModalOpened: true})
      this.setState({selectedExpenseName})
      this.setState({selectedExpenseIndex: rowIdx})
    }
  },

  closeModal () {
    this.setState({amountModalOpened: false})
  },

  render () {
    return (
      <ExpenseTable
        columns={this.state.columns}
        rows={this.state.expenses}
        selectedExpenseName={this.state.selectedExpenseName}
        amountModalOpened={this.state.amountModalOpened}
        handleAddRow={this.handleAddRow}
        handleDetailAdded={this.handleDetailAdded}
        handleRowUpdated={this.handleRowUpdated}
        onCellSelected={this.onCellSelected}
        closeModal={this.closeModal}
        />
    )
  }
})

export default ExpenseTableContainer
