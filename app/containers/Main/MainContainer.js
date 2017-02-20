import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'
import { Navigation } from 'components'
import { LeftPaneContainer } from 'containers'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionsCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    const leftPaneStyle = { backgroundColor: 'white', borderRight: '1px solid #D7DADA', overflowY: 'scroll', paddingTop: '65px' };
    const rightPaneStyle = { overflowY: 'scroll', paddingTop: '65px' };

    return this.props.isFetching === true
    ? null
    : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <SplitPane defaultSize={230} split="vertical" pane1Style={leftPaneStyle} pane2Style={rightPaneStyle}>
          <LeftPaneContainer/>
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </SplitPane>
      </div>
  },
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionsCreators
  }, dispatch)
)(MainContainer)
