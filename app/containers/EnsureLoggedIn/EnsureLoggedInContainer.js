import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user'

const EnsureLoggedInContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    const { dispatch, currentURL, isAuthed } = this.props
    console.log('ensure logged in', currentURL, isAuthed);

    if (!isAuthed) {
      this.props.fetchAndLoginUser(() => {
        this.props.setRedirectUrl(currentURL)
      }, () => {
        this.props.setRedirectUrl(currentURL)
        this.context.router.push('/auth')
      })
    }
  },

  render () {
    if (this.props.isAuthed) {
      return this.props.children
    } else {
      return null
    }
  }
})

function mapStateToProps({user}, props) {
  return {
    isAuthed: user.isAuthed,
    isFetching: user.isFetching,
    currentURL: props.location.pathname
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnsureLoggedInContainer)
