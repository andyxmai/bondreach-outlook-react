import React from 'react'
import { PageHeader } from 'components'

const PageHeaderContainer = React.createClass({
  handleVersionChanged () {
    console.log('version change clicked')
  },

  render () {
    return (
      <PageHeader
        title={this.props.title}
        currentVersion={'original'}
        handleVersionChanged={this.handleVersionChanged}
      />
    )
  }
})

export default PageHeaderContainer
