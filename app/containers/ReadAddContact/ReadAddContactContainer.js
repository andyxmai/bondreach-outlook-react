import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddContactContainer } from 'containers'
import * as addContactActionCreators from 'redux/modules/addContact'

const ReadAddContactContainer = React.createClass({

  componentDidMount () {
    this.props.loadAndStoreContactInfo()
  },

  render () {
    return (
      <AddContactContainer />
    )
  }
})

function mapDispatchToProps (dispatch) {
  return bindActionCreators(addContactActionCreators, dispatch)
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(ReadAddContactContainer)
