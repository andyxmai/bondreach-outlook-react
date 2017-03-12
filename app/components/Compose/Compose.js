import React, { PropTypes } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { contact, section, preference } from './styles.css'

export default function Compose (props) {
  return (
    <div>
    {props.isFetching
      ?
      <div><Spinner type={ SpinnerType.large } label='Loading...' /></div>
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
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <TextField label='Size (in dollars)'
                onChanged={props.onInvestmentSizeChanged}
                value={props.investmentSize}
              />
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
                >{'Filter contacts'}</PrimaryButton>
            </div>
          </div>
        </div>
        {props.filteredContacts.length
          ?
          <div className={section}>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{`Relevant Contacts (${props.filteredContacts.length})`}</div>
              </div>
            </div>
            <div className={contact}>
              {props.filteredContacts.map((filteredContact) => (
                <div key={filteredContact.id}>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                      <div className="ms-fontSize-l">{`${filteredContact.firstName} ${filteredContact.lastName}`}</div>
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                      <div>{props.company}</div>
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                      {filteredContact.investmentTypePreferences.map((type) => (
                        <span key={type.id} className={preference}>{type.name}</span>
                      ))}
                      <span className={preference}>
                        ${filteredContact.minimumInvestmentSize}-
                        {filteredContact.maximumInvestmentSize === 100000000
                          ? '100,000,000+'
                          : filteredContact.maximumInvestmentSize}
                      </span>
                      {filteredContact.regionPreferences.map((region) => (
                        <span key={region.id} className={preference}>{region.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <PrimaryButton
                    data-automation-id='add-contact'
                    onClick={props.addToBcc}
                  >{'Add to bcc'}</PrimaryButton>
              </div>
            </div>
          </div>
          :
          <div>
            {props.hasQueried
              ? <div>{'No interested contacts found'}</div>
              : <div>{'Enter deal info to find interested investors'}</div>
            }
          </div>
        }
      </div>
    }
    </div>
  )
}
