import React, {PropTypes} from 'react'
import { NewProperty } from 'components'

const NewPropertyContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  handleSubmit (e) {
    e.stopPropagation()
    const destination = '/expenses'
    this.context.router.push(destination)
  },

  render () {
    return (
      <NewProperty
        handleSubmit={this.handleSubmit}
      />
    )
  }
})

export default NewPropertyContainer
