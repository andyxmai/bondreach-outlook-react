import React, { PropTypes } from 'react'
import { Link as RouterLink } from 'react-router'
import numeral from 'numeral'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { Link } from 'office-ui-fabric-react/lib/Link'
import { section, borderedSection, preferenceType, inline, subline, link, tasks,
         view, icon, info, add, mainView, card, subject, preview, emailContent,
       } from './styles.css'
import { formatInvestmentSizePreference } from 'helpers/utils'
import { blockBtn, buttonSection, centerPage, messageBar, spacedRow } from 'sharedStyles/styles.css'
import { ISOStringToDate } from 'helpers/dates'
import { investmentSizeTypeEquity, investmentSizeTypeDebt } from 'config/constants'

function NotesPanel (props) {
  return (
    <Panel
      isOpen={ props.isNotesPanelOpened }
      type={ PanelType.smallFluid }
      onDismiss={ props.onHideNotes }
      headerText={`Notes - ${props.firstName} ${props.lastName}`}
    >
      { props.isSavingNotes
        ? <div className={centerPage}><Spinner type={ SpinnerType.large } label='Save notes...' /></div>
        :
        <div>
          { props.notesSavedErrorMsg !== ''
            ? <div className={messageBar}><MessageBar
              messageBarType={ MessageBarType.error }>
              {props.notesSavedErrorMsg}</MessageBar></div>
            : null
          }
          { props.notesSavedSuccessMsg !== ''
            ? <div className={messageBar}><MessageBar
              messageBarType={ MessageBarType.success }>
              {props.notesSavedSuccessMsg}</MessageBar></div>
            : null
          }
          <TextField
            multiline
            resizable={ false }
            value={props.notes}
            onChanged={props.onNotesChanged}
            rows={ 20 } />
            <PrimaryButton
                data-automation-id='save-notes'
                onClick={props.onSaveNotes}
                className={blockBtn}
                >{'Save'}</PrimaryButton>
        </div>
      }
    </Panel>
  )
}

function Correspondence ({correspondence, onViewItem}) {
  return (
    <div className={`ms-Grid-row ${spacedRow} ${card}`} key={correspondence.id}>
      <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
        <div>{correspondence.correspondenceType}</div>
      </div>
      <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
        <div>{ISOStringToDate(correspondence.date)}</div>
      </div>
      <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
        <div className={view} id={correspondence.itemId} onClick={onViewItem}>{'view'}</div>
      </div>
      { correspondence.subject
        ? <div className={`ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ${emailContent}`}>
            <div className={subject}>{correspondence.subject}</div>
          </div>
        : null
      }
      { correspondence.preview
        ? <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={preview}>{correspondence.preview}...</div>
          </div>
        : null
      }
    </div>
  )
}

export default function ViewContact (props) {
  return (
    <div>
    { props.isFetching
      ?
      <div className={centerPage}><Spinner type={ SpinnerType.large } label='Loading...' /></div>
      :
      <div>
        <div className={`ms-Grid ${mainView}`}>
          { props.error !== ''
            ? <div className={messageBar}><MessageBar
              messageBarType={ MessageBarType.error }>
              {props.error}</MessageBar></div>
            : null
          }
          { props.hasOutlookContact === props.hasOutlookContact 
            ? null
            : <MessageBar
                messageBarType={ MessageBarType.warning }>
                <div>{'Contact not found in Outlook'}<div className={add} onClick={props.onAddContactToOutlook}>{'Add to my Outlook account'}</div></div>
              </MessageBar>
          }
          <NotesPanel
            isNotesPanelOpened={props.isNotesPanelOpened}
            onHideNotes={props.onHideNotes}
            firstName={props.firstName}
            lastName={props.lastName}
            isSavingNotes={props.isSavingNotes}
            notesSavedErrorMsg={props.notesSavedErrorMsg}
            notesSavedSuccessMsg={props.notesSavedSuccessMsg}
            notes={props.notes}
            onNotesChanged={props.onNotesChanged}
            onSaveNotes={props.onSaveNotes}
          />
          <div className={section}>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{`${props.firstName} ${props.lastName}`}</div>
              </div>
              <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                <RouterLink to="/edit-contact"><div className={`ms-fontSize-m ${icon}`}><i className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i></div></RouterLink>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div>{props.company}</div>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className={subline}>{props.email}</div>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className={subline}>{props.phone}</div>
              </div>
            </div>
          </div>

          <div className={borderedSection}>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{'Investment Preferences'}</div>
              </div>
            </div>

            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <span className={preferenceType}>{'TYPE'}</span>
                {props.investmentTypePreferences.map((type) => (
                  <span key={type.id} className={inline}>{type.name}</span>
                ))}
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                { props.investmentType === ''
                  ? <span className={preferenceType}>{'SIZE'}</span>
                  : props.investmentType === investmentSizeTypeEquity
                    ? <span className={preferenceType}>{'EQUITY SIZE'}</span>
                    : <span className={preferenceType}>{'DEBT SIZE'}</span>
                }
                <span className={inline}>
                  {formatInvestmentSizePreference(props.minimumInvestmentSize, false)} - {formatInvestmentSizePreference(props.maximumInvestmentSize, true)}
                </span>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <span className={preferenceType}>{'IRR'}</span>
                <span className={inline}>
                  {props.minimumIrrReturn}% - {props.maximumIrrReturn}%
                </span>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <span className={preferenceType}>{'REGION'}</span>
                {props.regionPreferences.map((region) => (
                  <span key={region.id} className={inline}>{region.name}</span>
                ))}
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <Link
                    data-automation-id='add-notes'
                    onClick={props.onShowNotes}
                  ><div style={{fontSize:'14px'}}>{'See notes'}</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={borderedSection}>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{'Tasks'}</div>
              </div>
              <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                <RouterLink to={`/add-reminder/${props.id}`}><div className={`ms-fontSize-l ${icon}`}><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i></div></RouterLink>
              </div>
            </div>
            <div className={`ms-Grid-row ${spacedRow}`}>
              { props.upcomingFollowUp
                ? <div className={tasks}>
                    <div className="ms-Grid-col ms-u-sm7 ms-u-md7 ms-u-lg7">
                      <div>{'Next follow up: '}</div>
                    </div>
                    <div className="ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5">
                      <div>{props.upcomingFollowUp}</div>
                    </div>
                  </div>
                : <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <div className={inline}>{'None'}</div>
                  </div>
              }
            </div>
          </div>
          <div className={borderedSection}>
            <div className={`ms-Grid-row ${spacedRow}`}>
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{'Contact History'}</div>
              </div>
            </div>
            { props.correspondences.length > 0
              ? <div>{ props.correspondences.map((correspondence) => (
                  <Correspondence
                     key={correspondence.id}
                    correspondence={correspondence}
                    onViewItem={props.onViewItem}
                  />
                ))}</div>
              : <div className={`ms-Grid-row ${spacedRow}`}>
                  <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12"><div className={inline}>{'None'}</div></div>
                </div>
            }
          </div>
        </div>
        <div className={buttonSection}>
          <PrimaryButton
            data-automation-id='track-message'
            onClick={props.onTagEmailMessage}
            className={blockBtn}
            >{'Tag this email message'}</PrimaryButton>
        </div>
      </div>
    }
    </div>
  )
}
