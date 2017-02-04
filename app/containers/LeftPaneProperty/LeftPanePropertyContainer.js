import React from 'react'
import { LeftPaneProperty } from 'components'

const LeftPanePropertyContainer = React.createClass({
  handleHeaderClick () {
    console.log('Header clicked')
  },
  render () {
    return (
      <LeftPaneProperty
        isCollapsed={true}
        handleHeaderClick={this.handleHeaderClick}
      />
    )
  }
})

export default LeftPanePropertyContainer
