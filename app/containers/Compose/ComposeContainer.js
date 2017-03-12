import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filterContactsActionCreators from 'redux/modules/filterContacts'
import { Compose } from 'components'
import { FilterContactsContainer } from 'containers'
import { formatToSelectOptions } from 'helpers/utils'


const ComposeContainer = React.createClass({
  statusUpdate(icon, text) {
    Office.context.mailbox.item.notificationMessages.replaceAsync("status", {
      type: "informationalMessage",
      icon: icon,
      message: text,
      persistent: false
    });
  },

  addTextToBody(text, icon, event) {
    var obj = this
    Office.context.mailbox.item.body.setSelectedDataAsync(text, { coercionType: Office.CoercionType.Text },
      function (asyncResult){
        if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
          obj.statusUpdate(icon, "\"" + text + "\" inserted successfully.");
        }
        else {
          Office.context.mailbox.item.notificationMessages.addAsync("addTextError", {
            type: "errorMessage",
            message: "Failed to insert \"" + text + "\": " + asyncResult.error.message
          });
        }
        event.completed();
      });
  },

  addToBcc () {
    this.props.handleAddToBcc()
  },

  render () {
    return (
      <FilterContactsContainer
        isComposeView={true}
      />
    )
  }
})

function mapStateToProps ({filterContacts}) {
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
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(filterContactsActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeContainer)
