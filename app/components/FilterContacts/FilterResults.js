import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu'
import { contact, contactContainer, section, inline, name, company, chevron, fixedBtn, actionBtn } from './styles.css'
import { blockBtn } from 'sharedStyles/styles.css'
import { formatInvestmentSizePreferences } from 'helpers/utils'

export default function FilterResults (props) {
  return (
    <div className="ms-Grid">
      {props.filteredContacts.length
        ?
        <div className={section}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
              <div className="ms-fontWeight-semibold ms-fontSize-l">{`Relevant Contacts (${props.filteredContacts.length})`}</div>
            </div>
            <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
              { props.showInputs
                ? <div className={chevron} onClick={props.onSearchResultsCollapseClicked}><i className="ms-Icon ms-Icon--ChevronUp" aria-hidden="true"></i></div>
                : <div className={chevron} onClick={props.onSearchResultsCollapseClicked}><i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i></div>
              }
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
                      <span key="size-preference" className={inline}>
                        {formatInvestmentSizePreferences(filteredContact.minimumInvestmentSize, filteredContact.maximumInvestmentSize)}
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
          { props.isComposeView
            ? <div className={`${fixedBtn}`}>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <DefaultButton
                        data-automation-id='add-contact'
                        onClick={props.addToMail}
                      >{'to'}</DefaultButton>
                  </div>
                  <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <DefaultButton
                        data-automation-id='add-cc'
                        onClick={props.addToCc}
                      >{'cc'}</DefaultButton>
                  </div>
                  <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <DefaultButton
                        data-automation-id='add-bcc'
                        onClick={props.addToBcc}
                      >{'bcc'}</DefaultButton>
                  </div>
                </div>
              </div>
            : null
          }
        </div>
        :
        <div>
          <div>{'No interested contacts found'}</div>
        </div>
      }
    </div>
  )
}
