import React, { PropTypes } from 'react'
import { MainContactInfo } from 'components'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { autofill } from './styles.css'
import { blockBtn, centerPage, spacedRow } from 'sharedStyles/styles.css'

export default function AddContact (props) {
  return (
    <div>
    {props.isLoading
      ?
      <div className={centerPage}><Spinner type={ SpinnerType.large } label='Loading...' /></div>
      :
      <div className="ms-Grid">
        { props.error !== ''
          ? <MessageBar
            messageBarType={ MessageBarType.error }
            onDismiss={props.onRemoveErrorMsg}>
            {props.error}</MessageBar>
          : null
        }
        <Panel
          isOpen={ props.isNotesPanelOpened }
          type={ PanelType.smallFluid }
          onDismiss={ props.onHideNotes }
          headerText='Notes'>
          <TextField
            placeholder='add you notes here...'
            multiline
            resizable={ false }
            value={props.notes}
            onChanged={props.onNotesChanged}
            rows={ 20 } />
          <PrimaryButton
              data-automation-id='save-notes'
              onClick={props.onHideNotes}
              className={blockBtn}
              >{'Save'}</PrimaryButton>
        </Panel>
        <div className={spacedRow}></div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
            <div className="ms-fontWeight-semibold ms-fontSize-l">{'New Contact'}</div>
          </div>
          <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
            <div className={`ms-fontSize-s ${autofill}`} onClick={props.onAutoFillClicked}>{'autofill'}</div>
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
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <DefaultButton
                data-automation-id='add-notes'
                onClick={props.onShowNotes}
              >{'Add notes'}
            </DefaultButton>
          </div>
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <PrimaryButton
                data-automation-id='add-contact'
                onClick={props.onAddContactClicked}
                >{'Add contact'}</PrimaryButton>
          </div>
        </div>
      </div>
    }
    </div>
  )
}
