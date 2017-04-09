import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as feedActionCreators from 'redux/modules/feed'
import { Feed } from 'components'
import * as analytics from 'helpers/analytics'

const FeedContainer = React.createClass({

  componentDidMount () {
    this.props.fetchAndHandleNewsFeed()
    amplitude.getInstance().logEvent(analytics.BR_OL_NEWS_FEED)
  },

  handleArticleClicked (e) {
    const id = e.target.id
    var url = ''
    for (var i = 0; i < this.props.newsFeed.length; i++) {
      const item = this.props.newsFeed[i]
      if (item.id === id) {
         url = item.url
         break
      }
    }
    const eventProperties = {id}
    amplitude.getInstance().logEvent(analytics.BR_OL_NEWS_FEED_ARTICLE_CLICKED, eventProperties)

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
