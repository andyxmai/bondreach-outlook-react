import React, { PropTypes } from 'react'
import { MainContactInfo } from 'components'
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { mainView, cancel } from './styles.css'
import { blockBtn, buttonSection } from 'sharedStyles/styles.css'

export default function EditContact (props) {
  return (
    <div>
      <div className={`ms-Grid ${mainView}`}>
        { props.error !== ''
          ? <MessageBar
            messageBarType={ MessageBarType.error }
            onDismiss={props.onRemoveErrorMsg}>
            {props.error}</MessageBar>
          : null
        }
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
            <div className="ms-fontWeight-semibold ms-fontSize-l">{'Edit Contact'}</div>
          </div>
          <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
            <div className={`ms-fontSize-l ${cancel}`} onClick={props.onCancelClicked}><i className="ms-Icon ms-Icon--Cancel" aria-hidden="true"></i></div>
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
          investmentType={props.investmentType}
          onInvestmentPreferenceSizeTypeChanged={props.onInvestmentPreferenceSizeTypeChanged}
          minimumIrrReturn={props.minimumIrrReturn}
          onMinimumIrrReturnChanged={props.onMinimumIrrReturnChanged}
          maximumIrrReturn={props.maximumIrrReturn}
          onMaximumIrrReturnChanged={props.onMaximumIrrReturnChanged}
          regionPreferencesSelected={props.regionPreferencesSelected}
          regionPreferenceOptions={props.regionPreferenceOptions}
          onRegionPreferenceChanged={props.onRegionPreferenceChanged}
        />
      </div>
      <div className={buttonSection}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
              <Button
                  data-automation-id='cancel'
                  onClick={props.onCancelClicked}
                  className={blockBtn}
                  >{'Cancel'}</Button>
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
              <PrimaryButton
                  data-automation-id='update-contact'
                  onClick={props.onUpdateContactClicked}
                  className={blockBtn}
                  >{'Update contact'}</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
