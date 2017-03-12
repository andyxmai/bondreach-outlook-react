import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Logout } from 'components'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount () {
  },
  
  render () {
    return (
      <Logout />
    )
  }
})

export default connect()(LogoutContainer)
