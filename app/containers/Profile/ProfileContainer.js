import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/user'
import { Profile } from 'components'

const ProfileContainer = React.createClass({
  componentDidMount () {
    this.props.fetchAndHandleProfile()
  },

  render () {
    return (
      <Profile
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        email={this.props.email}
        company={this.props.company}
      />
    )
  }
})

function mapStateToProps ({user}) {
  return {
    isFetching: user.isFetching,
    error: user.error,
    authedId: user.authedId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    company: user.company,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
