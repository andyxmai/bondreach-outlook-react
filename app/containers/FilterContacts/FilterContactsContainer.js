import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactsActionCreators from 'redux/modules/filterContacts'
import { FilterContacts } from 'components'
import { formatToSelectOptions } from 'helpers/utils'


const FilterContactsContainer = React.createClass({
  propTypes: {
    hasQueried: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  addToBcc () {
    this.props.handleAddToBcc()
  },

  componentDidMount () {
    this.props.fetchAndAddSelectOptions()
  },

  goToContact (contactId) {
    this.context.router.push(`/view-contact/${contactId}`)
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

  handleFilterContacts () {
    this.props.fetchFilterContacts()
  },

  render () {
    return (
      <FilterContacts
        hasQueried={this.props.hasQueried}
        isFetching={this.props.isFetching}
        error={this.props.error}
        investmentSize={this.props.investmentSize}
        filteredContacts={this.props.filteredContacts}
        regionPreferenceOptions={this.props.regionPreferenceOptions}
        investmentTypePreferenceOptions={this.props.investmentTypePreferenceOptions}
        isComposeView={this.props.isComposeView}
        addToBcc={this.addToBcc}
        onInvestmentTypeChanged={this.handleInvestmentTypeChanged}
        onInvestmentSizeChanged={this.handleInvestmentSizeChanged}
        onInvestmentRegionChanged={this.handleInvestmentRegionChanged}
        onFilterContacts={this.handleFilterContacts}
        goToContact={this.goToContact}
      />
    )
  }
})

function mapStateToProps ({filterContacts}, props) {
  return {
    hasQueried: filterContacts.hasQueried,
    isFetching: filterContacts.isFetching,
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
