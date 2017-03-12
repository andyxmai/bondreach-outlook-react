import React, { PropTypes } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label'
import Select from 'react-select'
import { notesField, dropdown } from './styles.css'
import { maxInvestmentSizePreference } from 'config/constants'
import { blockBtn } from 'sharedStyles/styles.css'

const minInvestmentSizeOptions = [
  { label: 'No minimum', value: 0 },
  { label: '$1mm', value: 1000000 },
  { label: '$10mm', value: 10000000 },
  { label: '$20mm', value: 20000000 },
  { label: '$30mm', value: 30000000 },
  { label: '$40mm', value: 40000000 },
  { label: '$50mm', value: 50000000 },
  { label: '$60mm', value: 60000000 },
  { label: '$70mm', value: 70000000 },
  { label: '$80mm', value: 80000000 },
  { label: '$90mm', value: 90000000 },
]

const maxInvestmentSizeOptions = [
  { label: '$1mm', value: 1000000 },
  { label: '$10mm', value: 10000000 },
  { label: '$20mm', value: 20000000 },
  { label: '$30mm', value: 30000000 },
  { label: '$40mm', value: 40000000 },
  { label: '$50mm', value: 50000000 },
  { label: '$60mm', value: 60000000 },
  { label: '$70mm', value: 70000000 },
  { label: '$80mm', value: 80000000 },
  { label: '$90mm', value: 90000000 },
  { label: 'No maximum', value: maxInvestmentSizePreference },
]

export default function AddContact (props) {
  return (
    <div>
    {props.isLoading
      ?
      <div><Spinner type={ SpinnerType.large } label='Loading...' /></div>
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
          type={ PanelType.smallFixedFar }
          onDismiss={ props.onHideNotes }
          headerText='Notes'
        >
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
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className="ms-fontWeight-semibold ms-fontSize-l">{'New Contact'}</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <TextField label='First name' required={ true } value={props.firstName} onChanged={props.onFirstNameChanged} />
          </div>
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <TextField label='Last name' required={ true } value={props.lastName} onChanged={props.onLastNameChanged} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm7 ms-u-md7 ms-u-lg7">
            <TextField label='Email' required={ true } value={props.email} onChanged={props.onEmailChanged} />
          </div>
          <div className="ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5">
            <TextField label='Phone' required={ false } value={props.phone} onChanged={props.onPhoneChanged} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <TextField label='Company' required={ true } value={props.company} onChanged={props.onCompanyChanged} />
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className="ms-fontWeight-semibold ms-fontSize-l">{'Investment Preferences'}</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <Label>{'Type'}</Label>
            <Select
              multi={true}
              simpleValues
              clearable={false}
              name="type-preferences"
              value={props.investmentTypePreferencesSelected}
              options={props.investmentTypePreferenceOptions}
              onChange={props.onTypePreferenceChanged}
              className={`ms-Dropdown ${dropdown}`}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <Label>{'Investment size'}</Label>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <Select
              name="min-investment-size"
              clearable={false}
              options={minInvestmentSizeOptions}
              value={props.minimumInvestmentSize}
              onChange={props.onInvestmentPreferenceMinSizeChanged}
              className={`ms-Dropdown ${dropdown}`}
            />
          </div>
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <Select
              name="max-investment-size"
              clearable={false}
              options={maxInvestmentSizeOptions}
              value={props.maximumInvestmentSize}
              onChange={props.onInvestmentPreferenceMaxSizeChanged}
              className={`ms-Dropdown ${dropdown}`}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <Label>{'Region'}</Label>
            <Select
              multi={true}
              simpleValues
              clearable={false}
              name="region-preferences"
              value={props.regionPreferencesSelected}
              options={props.regionPreferenceOptions}
              onChange={props.onRegionPreferenceChanged}
              className={`ms-Dropdown ${dropdown}`}
            />
          </div>
        </div>
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
