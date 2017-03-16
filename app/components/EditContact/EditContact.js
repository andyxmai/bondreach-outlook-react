import React, { PropTypes } from 'react'
import { MainContactInfo } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { blockBtn } from 'sharedStyles/styles.css'

export default function EditContact (props) {
  return (
    <div className="ms-Grid">
      { props.error !== ''
        ? <MessageBar
          messageBarType={ MessageBarType.error }
          onDismiss={props.onRemoveErrorMsg}>
          {props.error}</MessageBar>
        : null
      }
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className="ms-fontWeight-semibold ms-fontSize-l">{'Edit Contact'}</div>
        </div>
      </div>
      <MainContactInfo
        firstName={props.firstName}
        onFirstNameChanged={props.onFirstNameChanged}
        lastName={props.lastName}
        onLastNameChanged={props.onLastNameChanged}
        email={props.email}
        onEmailChanged={props.onEmailChanged}
        phone={props.phone}
        onPhoneChanged={props.onPhoneChanged}
        company={props.company}
        onCompanyChanged={props.onCompanyChanged}
        investmentTypePreferencesSelected={props.investmentTypePreferencesSelected}
        investmentTypePreferenceOptions={props.investmentTypePreferenceOptions}
        onTypePreferenceChanged={props.onTypePreferenceChanged}
        minimumInvestmentSize={props.minimumInvestmentSize}
        onInvestmentPreferenceMinSizeChanged={props.onInvestmentPreferenceMinSizeChanged}
        maximumInvestmentSize={props.maximumInvestmentSize}
        onInvestmentPreferenceMaxSizeChanged={props.onInvestmentPreferenceMaxSizeChanged}
        minimumIrrReturn={props.minimumIrrReturn}
        onMinimumIrrReturnChanged={props.onMinimumIrrReturnChanged}
        maximumIrrReturn={props.maximumIrrReturn}
        onMaximumIrrReturnChanged={props.onMaximumIrrReturnChanged}
        regionPreferencesSelected={props.regionPreferencesSelected}
        regionPreferenceOptions={props.regionPreferenceOptions}
        onRegionPreferenceChanged={props.onRegionPreferenceChanged}
      />
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <PrimaryButton
              data-automation-id='update-contact'
              onClick={props.onUpdateContactClicked}
              className={blockBtn}
              >{'Update contact'}</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
