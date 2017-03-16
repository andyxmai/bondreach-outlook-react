import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactsActionCreators from 'redux/modules/filterContacts'
import { FilterContacts, FilterResults } from 'components'
import { formatToSelectOptions } from 'helpers/utils'


const FilterContactsContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    showInputs: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    investmentTypePreferences: PropTypes.string.isRequired,
    regionPreferences: PropTypes.string.isRequired,
    filteredContacts: PropTypes.array.isRequired,
    regionPreferenceOptions: PropTypes.array.isRequired,
    investmentTypePreferenceOptions: PropTypes.array.isRequired,
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidUpdate(prevProps) {
  },

  addToMail () {
    const emails = this.props.filteredContacts.map(function (contact) { return contact.email })
    Office.context.mailbox.item.to.setAsync(emails)
  },

  addToCc () {
    const emails = this.props.filteredContacts.map(function (contact) { return contact.email })
    Office.context.mailbox.item.cc.setAsync(emails)
  },

  addToBcc () {
    const emails = this.props.filteredContacts.map(function (contact) { return contact.email })
    Office.context.mailbox.item.bcc.setAsync(emails)
  },

  componentDidMount () {
    this.props.fetchAndAddSelectOptions()
  },

  handleInvestmentTypeChanged (item) {
    this.props.handleInvestmentTypeFilterChanged(item.id)
  },

  handleInvestmentSizeChanged (e) {
    this.props.handleInvestmentSizeFilterChanged(e.target.rawValue)
  },

  handleInvestmentRegionChanged (item) {
    this.props.handleInvestmentRegionFilterChanged(item.id)
  },

  handleSearchResultsCollapseClicked () {
    this.props.exchangeShowInputs()
  },

  handleFilterContacts () {
    this.props.fetchFilterContacts()
  },

  render () {
    return (
      <div>
        {this.props.showInputs
          ? <FilterContacts
            isFetching={this.props.isFetching}
            error={this.props.error}
            investmentSize={this.props.investmentSize}
            filteredContacts={this.props.filteredContacts}
            regionPreferenceOptions={this.props.regionPreferenceOptions}
            investmentTypePreferenceOptions={this.props.investmentTypePreferenceOptions}
            onInvestmentTypeChanged={this.handleInvestmentTypeChanged}
            onInvestmentSizeChanged={this.handleInvestmentSizeChanged}
            onInvestmentRegionChanged={this.handleInvestmentRegionChanged}
            onFilterContacts={this.handleFilterContacts}
          />
        : null
        }
        <FilterResults
          filteredContacts={this.props.filteredContacts}
          showInputs={this.props.showInputs}
          isComposeView={this.props.isComposeView}
          onSearchResultsCollapseClicked={this.handleSearchResultsCollapseClicked}
          addToMail={this.addToMail}
          addToCc={this.addToCc}
          addToBcc={this.addToBcc}
        />
      </div>
    )
  }
})

function mapStateToProps ({filterContacts}, props) {
  return {
    isFetching: filterContacts.isFetching,
    showInputs: filterContacts.showInputs,
    error: filterContacts.error,
    investmentTypePreferences: filterContacts.investmentTypePreferences,
    regionPreferences: filterContacts.regionPreferences,
    investmentSize: filterContacts.investmentSize,
    filteredContacts: filterContacts.filteredContacts,
    regionPreferenceOptions: filterContacts.regionPreferenceOptions,
    investmentTypePreferenceOptions: filterContacts.investmentTypePreferenceOptions,
    isComposeView: props.isComposeView ? true : false
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(filterContactsActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterContactsContainer)
