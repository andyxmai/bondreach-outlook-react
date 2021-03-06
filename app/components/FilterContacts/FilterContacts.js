import React, { PropTypes } from 'react'
import numeral from 'numeral'
import Cleave from 'cleave.js/dist/cleave-react'
import { Link } from 'react-router'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { contact, contactContainer, section, inline, borderedSection, name, company, btn } from './styles.css'
import { btnRed } from 'sharedStyles/buttons.css'
import { blockBtn, centerPage } from 'sharedStyles/styles.css'
import { formatInvestmentSizePreferences } from 'helpers/utils'

export default function Compose (props) {
  return (
    <div>
    {props.isFetching
      ?
      <div className={ centerPage }><Spinner type={ SpinnerType.large } label='Loading...' /></div>
      :
      <div className="ms-Grid">
        { props.error !== ''
          ? <MessageBar
            messageBarType={ MessageBarType.error }>
            {props.error}</MessageBar>
          : null
        }
        <div className={section}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <div className="ms-fontWeight-semibold ms-fontSize-l">{'Deal information'}</div>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <Dropdown
                  label='Type'
                  options={props.investmentTypePreferenceOptions}
                  required={ true }
                  onChanged={props.onInvestmentTypeChanged}
                />
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
              <div className="ms-TextField">
                <Label>{'Size (in dollars)'}</Label>
                <Cleave className="ms-TextField-field"
                  options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  onChange={props.onInvestmentSizeChanged} value={props.investmentSize}
                  />
              </div>
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
              <div className="ms-TextField">
                <Label>{'Target return (%)'}</Label>
                <Cleave className="ms-TextField-field"
                  options={ {numeral: true} }
                  onChange={props.onInvestmentTargetReturnChanged} value={props.targetReturn}
                  maxLength={3}
                  />
              </div>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <Dropdown
                  label='Region'
                  options={props.regionPreferenceOptions}
                  onChanged={props.onInvestmentRegionChanged}
                />
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <PrimaryButton
                  data-automation-id='add-contact'
                  onClick={props.onFilterContacts}
                  className={`${blockBtn}`}
                >{'Filter contacts'}</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}
