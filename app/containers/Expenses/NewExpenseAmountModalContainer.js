import React from 'react'
import { NewExpenseAmountModal } from 'components'

const NewExpenseAmountModalContainer = React.createClass({
  getInitialState () {
    return {
      amountType: 'simple',
      amount: '1233',
      unit: 'dollars',
      frequency: 'annually',
      columns: [  // get it from props
        { key: 'month', name: '', editable: false, width: 200 },
        { key: '12/2017', name: '12/2017', editable: true, },
        { key: '12/2018', name: '12/2018', editable: true, },
        { key: '12/2019', name: '12/2019', editable: true, },
        { key: '12/2020', name: '12/2020', editable: true, },
        { key: '12/2021', name: '12/2021', editable: true,},
      ],
      expenseDetail: [  // get it from props
        {id: 0, month: 'January', '12/2017': 10, '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 1, month: 'February', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 2, month: 'March', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 3, month: 'April', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 4, month: 'May', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 5, month: 'June', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 6, month: 'July', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 7, month: 'August', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 8, month: 'September', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 9, month: 'October', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 10, month: 'November', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 11, month: 'December', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 12, month: 'Annual Total', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 13, month: 'Inflation', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
        {id: 14, month: 'Inflated Total', '12/2017': '', '12/2018': '', '12/2019': '', '12/2020': '', '12/2021': '', },
      ],
    }
  },

  handleTypeChanged (e) {
    console.log(e.target.value)
    this.setState({amountType: e.target.value})
  },

  handleRowUpdated ({ rowIdx, updated }) {
    Object.assign(this.state.detailRows[rowIdx], updated)
  },

  handleAmountChanged (e) {
    this.setState({amount: e.target.rawValue})
  },

  handleUnitChanged (e) {
    this.setState({unit: e.target.value})
  },

  handleFrequencyChanged (e) {
    this.setState({frequency: e.target.value})
  },

  handleSubmit () {
    const amountDetail = {
      amountType: this.state.amountType,
      amount: this.state.amount,
      unit: this.state.unit,
      frequency: this.state.frequency,
      expenseDetail: this.state.expenseDetail,
    }
    this.props.handleDetailAdded(amountDetail)
    this.props.closeModal()
  },

  render () {
    return (
      <NewExpenseAmountModal
        amountType={this.state.amountType}
        amountModalOpened={this.props.amountModalOpened}
        amount={this.state.amount}
        unit={this.state.unit}
        frequency={this.state.frequency}
        columns={this.state.columns}
        rows={this.state.expenseDetail}
        selectedExpenseName={this.props.selectedExpenseName}
        closeModal={this.props.closeModal}
        onTypeChange={this.handleTypeChanged}
        handleRowUpdated={this.handleRowUpdated}
        handleAmountChanged={this.handleAmountChanged}
        handleUnitChanged={this.handleUnitChanged}
        handleFrequencyChanged={this.handleFrequencyChanged}
        handleSubmit={this.handleSubmit}
      />
    )
  }
})

export default NewExpenseAmountModalContainer
