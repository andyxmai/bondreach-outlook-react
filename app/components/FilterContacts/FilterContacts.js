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
import { maxInvestmentSizePreference } from 'config/constants'

export default function Compose (props) {
  return (
    <div>
    {props.isFetching
      ?
      <div><Spinner type={ SpinnerType.large } label='Loading...(filter contacts)' /></div>
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
              <div className="ms-TextField">
                <Label>{'Size (in dollars)'}</Label>
                <Cleave className="ms-TextField-field"
                  options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  onChange={props.onInvestmentSizeChanged} value={props.investmentSize}
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
                  className={`${btn}`}
                >{'Filter contacts'}</PrimaryButton>
            </div>
          </div>
        </div>
        {props.filteredContacts.length
          ?
          <div className={borderedSection}>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{`Relevant Contacts (${props.filteredContacts.length})`}</div>
              </div>
            </div>
            <div className={contactContainer}>
              {props.filteredContacts.map((filteredContact) => (
                <div className={contact} key={filteredContact.id}>
                  <Link to={`/view-contact/${filteredContact.id}`}>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <div className={name}>{`${filteredContact.firstName} ${filteredContact.lastName}`}</div>
                      </div>
                    </div>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <div className={company}>{filteredContact.company}</div>
                      </div>
                    </div>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        {filteredContact.investmentTypePreferences.map((type) => (
                          <span key={type.id} className={inline}>{type.name}</span>
                        ))}
                        <span className={inline}>
                          {filteredContact.minimumInvestmentSize === 0
                            ? 'no min'
                            : numeral(filteredContact.minimumInvestmentSize).format('0,0')
                          }-
                          {filteredContact.maximumInvestmentSize === maxInvestmentSizePreference
                            ? 'no max'
                            : numeral(filteredContact.maximumInvestmentSize).format('0,0')}
                        </span>
                        {filteredContact.regionPreferences.map((region) => (
                          <span key={region.id} className={inline}>{region.name}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                { props.isComposeView
                  ? <PrimaryButton
                      data-automation-id='add-contact'
                      onClick={props.addToBcc}
                      className={btn}
                    >{'Add to bcc'}</PrimaryButton>
                  : null
                }
              </div>
            </div>
          </div>
          :
          <div>
            {props.hasQueried
              ? <div>{'No interested contacts found'}</div>
              : null
            }
          </div>
        }
      </div>
    }
    </div>
  )
}
