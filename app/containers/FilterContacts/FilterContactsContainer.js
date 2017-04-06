import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactsActionCreators from 'redux/modules/filterContacts'
import { FilterContacts, FilterResults } from 'components'

const FilterContactsContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    showInputs: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    investmentTypePreferences: PropTypes.string.isRequired,
    regionPreferences: PropTypes.string.isRequired,
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

  handleInvestmentReturnChanged (e) {
    this.props.handleInvestmentReturnFilterChanged(e.target.rawValue)
  },

  handleInvestmentRegionChanged (item) {
    this.props.handleInvestmentRegionFilterChanged(item.id)
  },

  handleSearchResultsCollapseClicked () {
    this.props.exchangeShowInputs()
  },

  handleFilterContacts () {
    this.props.handleFilterContacts()
  },

  handleNextPageClicked () {
    this.props.handlePageClicked(this.props.filteredContactsNextUrl)
  },

  handlePrevPageClicked () {
    this.props.handlePageClicked(this.props.filteredContactsPrevUrl)
  },

  handleDownloadContactsClicked () {
    if (this.props.isGroupByCompanyChecked) {
      this.props.downloadCompanyContacts()
    } else {
      this.props.downloadContacts()
    }
  },

  handleGroupByCompanyClicked (e, isChecked) {
    this.props.changeGroupByCompany(isChecked)
    this.props.handleFilterContacts()
  },

  handleCloseDialog () {
    this.props.hideFilterContactsDialog()
  },

  handleSeeDetailsClicked (e) {
    const company = e.target.id
    this.props.fetchCompanyContactDetail(company)
  },

  render () {
    return (
      <div>
        {this.props.showInputs
          ? <FilterContacts
            isFetching={this.props.isFetching}
            error={this.props.error}
            investmentSize={this.props.investmentSize}
            targetReturn={this.props.targetReturn}
            filteredContacts={this.props.filteredContacts}
            regionPreferenceOptions={this.props.regionPreferenceOptions}
            investmentTypePreferenceOptions={this.props.investmentTypePreferenceOptions}
            onInvestmentTypeChanged={this.handleInvestmentTypeChanged}
            onInvestmentSizeChanged={this.handleInvestmentSizeChanged}
            onInvestmentTargetReturnChanged={this.handleInvestmentReturnChanged}
            onInvestmentRegionChanged={this.handleInvestmentRegionChanged}
            onFilterContacts={this.handleFilterContacts}
          />
        : null
        }
        <FilterResults
          isFiltering={this.props.isFiltering}
          isDownloading={this.props.isDownloading}
          isGroupByCompanyChecked={this.props.isGroupByCompanyChecked}
          isDialogOpened={this.props.isDialogOpened}
          filteredContactsCount={this.props.filteredContactsCount}
          filteredContacts={this.props.filteredContacts}
          filteredContactsNextUrl={this.props.filteredContactsNextUrl}
          filteredContactsPrevUrl={this.props.filteredContactsPrevUrl}
          showInputs={this.props.showInputs}
          isComposeView={this.props.isComposeView}
          filteredCompanyContactDetail={this.props.filteredCompanyContactDetail}
          onSearchResultsCollapseClicked={this.handleSearchResultsCollapseClicked}
          onNextPageClicked={this.handleNextPageClicked}
          onPrevPageClicked={this.handlePrevPageClicked}
          onDownloadContactsClicked={this.handleDownloadContactsClicked}
          onGroupByCompanyClicked={this.handleGroupByCompanyClicked}
          onCloseDialog={this.handleCloseDialog}
          onSeeDetailsClicked={this.handleSeeDetailsClicked}
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
    isFiltering: filterContacts.isFiltering,
    isDownloading: filterContacts.isDownloading,
    isGroupByCompanyChecked: filterContacts.isGroupByCompanyChecked,
    isDialogOpened: filterContacts.isDialogOpened,
    showInputs: filterContacts.showInputs,
    error: filterContacts.error,
    investmentTypePreferences: filterContacts.investmentTypePreferences,
    regionPreferences: filterContacts.regionPreferences,
    investmentSize: filterContacts.investmentSize,
    targetReturn: filterContacts.targetReturn,
    filteredContactsCount: filterContacts.filteredContactsCount,
    filteredContacts: filterContacts.filteredContacts,
    filteredContactsNextUrl: filterContacts.filteredContactsNextUrl,
    filteredContactsPrevUrl: filterContacts.filteredContactsPrevUrl,
    regionPreferenceOptions: filterContacts.regionPreferenceOptions,
    investmentTypePreferenceOptions: filterContacts.investmentTypePreferenceOptions,
    filteredCompanyContactDetail: filterContacts.filteredCompanyContactDetail,
    isComposeView: props.isComposeView ? true : false,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(filterContactsActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterContactsContainer)
