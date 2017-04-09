import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as feedActionCreators from 'redux/modules/feed'
import { Feed } from 'components'

const FeedContainer = React.createClass({

  componentDidMount () {
    this.props.fetchAndHandleNewsFeed()
  },

  handleArticleClicked (e) {
    const url = e.target.id
    var win = window.open(url, '_blank');
    win.focus();
  },

  render () {
    return (
      <Feed
        isFetching={this.props.isFetching}
        error={this.props.error}
        newsFeed={this.props.newsFeed}
        onArticleClicked={this.handleArticleClicked}
      />
    )
  }
})

function mapStateToProps ({feed}) {
  return {
    isFetching: feed.isFetching,
    error: feed.error,
    newsFeed: feed.newsFeed,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
