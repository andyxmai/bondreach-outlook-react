import React, { PropTypes } from 'react'
import { ContactResult } from 'components'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu'
import { Spinner, SpinnerSize, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { contact, contactContainer, section, inline, name, company, chevron,
  fixedBtn, actionBtn, pageLink, pageLinks, nextPage, downloadSpinner } from './styles.css'
import { blockBtn } from 'sharedStyles/styles.css'

export default function FilterResults (props) {
  return (
    <div>
      {props.isFiltering
        ? <div><Spinner type={ SpinnerType.large } label='Loading...' /></div>
        : <div className="ms-Grid">
            {props.filteredContacts.length
              ?
              <div className={section}>
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
                  <div className={`ms-Grid-col ms-u-sm7 ms-u-md7 ms-u-lg7 ${pageLinks}`}>
                    { props.filteredContactsPrevUrl !== ''
                      ? <span onClick={props.onPrevPageClicked} className={pageLink}><span><i className="ms-Icon ms-Icon--DoubleChevronLeft" aria-hidden="true"></i> Previous</span></span>
                      : null
                    }
                    { props.filteredContactsNextUrl !== ''
                      ? <span onClick={props.onNextPageClicked} className={pageLink}><span>Next <i className="ms-Icon ms-Icon--DoubleChevronRight" aria-hidden="true"></i></span></span>
                      : null
                    }
                  </div>
                  <div className={`ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5 ${pageLinks} ${nextPage}`}>
                    { props.isDownloading
                      ? <div><Spinner type={ SpinnerSize.xSmall }/></div>
                      : <div className={pageLink} onClick={props.onDownloadContactsClicked}>{'download'}</div>
                    }
                  </div>
                </div>
                <div className={contactContainer}>
                  {props.filteredContacts.map((filteredContact) => (
                    <ContactResult
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
