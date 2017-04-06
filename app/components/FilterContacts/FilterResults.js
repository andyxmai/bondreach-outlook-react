import React, { PropTypes } from 'react'
import { CompanyResult, ContactResult } from 'components'
import { Button, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { Spinner, SpinnerSize, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { contact, contactContainer, contactStyle, section, inline, name, company, chevron,
  fixedBtn, actionBtn, pageLink, pageLinks, nextPage, downloadSpinner, seeProfile } from './styles.css'
import { blockBtn, centerPage } from 'sharedStyles/styles.css'
import { formatInvestmentSizePreferences, formatInvestmentReturnPreferences } from 'helpers/utils'

function CompanyDetailDialog ({isDialogOpened, filteredCompanyContactDetail, onSeeDetailsClicked, onCloseDialog}) {
  return (
    <Dialog
      isOpen={ isDialogOpened }
      type={ DialogType.close }
      onDismiss={ onCloseDialog }
      title="Comany Details"
      isBlocking={ false }
      closeButtonAriaLabel='Close'
    >
      <div>
        { filteredCompanyContactDetail.length
        ? <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                {filteredCompanyContactDetail[0].company}
              </div>
            </div>

            <div className={`ms-Grid-row`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                {filteredCompanyContactDetail[0].investmentTypePreferences.map((type) => (
                  <span key={type.id} className={inline}>{type.name}</span>
                ))}
              </div>
            </div>
            <div className={`ms-Grid-row`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <span className={inline}>
                  {formatInvestmentSizePreferences(filteredCompanyContactDetail[0].minimumInvestmentSize, filteredCompanyContactDetail[0].maximumInvestmentSize)}
                </span>
              </div>
            </div>
            <div className={`ms-Grid-row`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <span className={inline}>
                  {`${formatInvestmentReturnPreferences(filteredCompanyContactDetail[0].minimumIrrReturn, filteredCompanyContactDetail[0].maximumIrrReturn)} return`}
                </span>
              </div>
            </div>
            <div className={`ms-Grid-row`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                {filteredCompanyContactDetail[0].regionPreferences.map((region) => (
                  <span key={region.id} className={inline}>{region.name}</span>
                ))}
              </div>
            </div>
            <br />
            <div>
              {'Contacts'}
              { filteredCompanyContactDetail.map((contact) =>(
                <div className="ms-Grid-row" key={contact.id}>
                  <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <div>{`${contact.firstName} ${contact.lastName}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        : <div><Spinner type={ SpinnerType.large } className={centerPage} /></div>
        }
      </div>
      <DialogFooter>
        <Button onClick={ onCloseDialog }>Close</Button>
      </DialogFooter>
    </Dialog>
  )
}

export default function FilterResults (props) {
  return (
    <div>
      {props.isFiltering
        ? <div><Spinner type={ SpinnerType.large } className={centerPage} label='Loading...' /></div>
        : <div className="ms-Grid">
            {props.filteredContacts.length
              ?
              <div className={section}>
                <CompanyDetailDialog
                  isDialogOpened={props.isDialogOpened}
                  filteredCompanyContactDetail={props.filteredCompanyContactDetail}
                  onCloseDialog={props.onCloseDialog}
                  onSeeDetailsClicked={props.onSeeDetailsClicked}
                />
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                    <div className="ms-fontWeight-semibold ms-fontSize-l">{`Relevant Contacts (${props.filteredContactsCount})`}</div>
                  </div>
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                    { props.showInputs
                      ? <div className={chevron} onClick={props.onSearchResultsCollapseClicked}><i className="ms-Icon ms-Icon--ChevronUp" aria-hidden="true"></i></div>
                      : <div className={chevron} onClick={props.onSearchResultsCollapseClicked}><i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i></div>
                    }
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-u-sm7 ms-u-md7 ms-u-lg7">
                    <Checkbox
                      label='group by company'
                      checked={ props.isGroupByCompanyChecked }
                      onChange={ props.onGroupByCompanyClicked } />
                  </div>
                  <div className={`ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5 ${pageLinks} ${nextPage}`}>
                    { props.isDownloading
                      ? <div><Spinner type={ SpinnerSize.xSmall }/></div>
                      : <div className={pageLink} onClick={props.onDownloadContactsClicked}><i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i>{'download'}</div>
                    }
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className={`ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6 ${pageLinks}`}>
                    { props.filteredContactsPrevUrl !== ''
                      ? <div onClick={props.onPrevPageClicked} className={pageLink}><span><i className="ms-Icon ms-Icon--DoubleChevronLeft" aria-hidden="true"></i> Previous</span></div>
                      : null
                    }
                  </div>
                  <div className={`ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6 ${pageLinks} ${nextPage}`}>
                    { props.filteredContactsNextUrl !== ''
                      ? <div onClick={props.onNextPageClicked} className={pageLink}><span>Next <i className="ms-Icon ms-Icon--DoubleChevronRight" aria-hidden="true"></i></span></div>
                      : null
                    }
                  </div>
                </div>
                <div className={contactContainer}>
                  {props.filteredContacts.map((filteredContact) => (
                    filteredContact.id === undefined
                    ? <CompanyResult
                        key={filteredContact.company}
                        contact={filteredContact}
                        isDialogOpened={props.isDialogOpened}
                        filteredCompanyContactDetail={props.filteredCompanyContactDetail}
                        onCloseDialog={props.onCloseDialog}
                        onSeeDetailsClicked={props.onSeeDetailsClicked}
                        />
                    : <ContactResult
                      key={filteredContact.id}
                      contact={filteredContact}/>
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
                <div className="ms-Grid-row">
                  <div className={`ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6 ${pageLinks}`}>
                    { props.filteredContactsPrevUrl !== ''
                      ? <div onClick={props.onPrevPageClicked} className={pageLink}><span><i className="ms-Icon ms-Icon--DoubleChevronLeft" aria-hidden="true"></i> Previous</span></div>
                      : null
                    }
                  </div>
                  <div className={`ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6 ${pageLinks} ${nextPage}`}>
                    { props.filteredContactsNextUrl !== ''
                      ? <div onClick={props.onNextPageClicked} className={pageLink}><span>Next <i className="ms-Icon ms-Icon--DoubleChevronRight" aria-hidden="true"></i></span></div>
                      : null
                    }
                  </div>
                </div>
              </div>
              :
              <div>
                <div>{'No interested contacts found'}</div>
              </div>
            }
          </div>
      }
    </div>
  )
}
