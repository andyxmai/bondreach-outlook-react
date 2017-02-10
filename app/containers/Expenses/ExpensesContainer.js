import React, {PropTypes} from 'react'
import { Expenses } from 'components'

const ExpensesContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  goToRentRoll (e) {
    e.stopPropagation()
    const destination = '/rent-roll'
    this.context.router.push(destination)
  },

  render () {
    return (
      <Expenses
        goToRentRoll={this.goToRentRoll}
      />
    )
  }
})

export default ExpensesContainer
