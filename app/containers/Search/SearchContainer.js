import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as searchActionCreators from 'redux/modules/search'
import { Search } from 'components'

const SearchContainer = React.createClass({
  handleSearchQueryChanged (value) {
    this.props.handleSearchQueryChanged(value)
  },

  handleSearchClicked () {
    this.props.fetchAndHandleSearchResults()
  },

  render () {
    return (
      <Search
        query={this.props.query}
        error={this.props.error}
        hasQueried={this.props.hasQueried}
        results={this.props.results}
        onSearchQueryChanged={this.handleSearchQueryChanged}
        onSearchClicked={this.handleSearchClicked}
      />
    )
  }
})

function mapStateToProps ({search}) {
  return {
    isFetching: search.isFetching,
    error: search.error,
    hasQueried: search.hasQueried,
    searchTerm: search.query,
    results: search.results,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(searchActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer)
