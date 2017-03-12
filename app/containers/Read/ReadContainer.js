import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddReminder } from 'components'
import * as readActionCreators from 'redux/modules/read'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'


const ReadContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount () {
    this.props.checkForContactSaved((hasContactSaved, contactId) => {
      if (hasContactSaved) {
        this.context.router.push('/view-contact/' + contactId)
      } else {
        this.context.router.push('/add-contact/?populate=true')
      }
    }, (error) => {
      console.error(error)
    })
  },

  render () {
    return (
      <div>
        {this.props.isFetching
          ? <div><Spinner type={ SpinnerType.large } label='Loading...' /></div>
          : <div>
              {this.props.error
                ?  <MessageBar
                    messageBarType={ MessageBarType.error }>
                    {this.props.error}</MessageBar>
                : null
              }
            </div>
        }
      </div>
    )
  }
})

function mapStateToProps ({read}) {
  return {
    isFetching: read.isFetching,
    error: read.error,
    hasContactSaved: read.hasContactSaved,
    contactSaved: read.contactSaved,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(readActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadContainer)
