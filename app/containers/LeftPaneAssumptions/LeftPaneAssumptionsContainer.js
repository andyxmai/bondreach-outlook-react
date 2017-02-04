import React from 'react'
import { LeftPaneAssumptions } from 'components'

const LeftPaneAssumptionsContainer = React.createClass({
  handleHeaderClick () {
    console.log('Header clicked')
  },

  render () {
    return (
      <LeftPaneAssumptions
        isCollapsed={true}
        handleHeaderClick={this.handleHeaderClick}
      />
    )
  }
})

export default LeftPaneAssumptionsContainer
