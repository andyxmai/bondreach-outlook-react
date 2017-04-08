import React, { PropTypes } from 'react'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import Select from 'react-select'
import { header, link, section, subline, dialogText } from './styles.css'
import { blockBtn, dropdown } from 'sharedStyles/styles.css'

function AddMembersDialog ({ isFetchingInviteCandidates, isInvitesDialogOpened,
  team, invites, inviteCandidatesOptions, inviteError, inviteSuccessMsg,
  onCloseInvitesDialog, onInvitesChanged,
  onSubmitNewMembersClicked }
) {
  return (
    <Dialog
      isOpen={ isInvitesDialogOpened }
      type={ DialogType.close }
      onDismiss={ onCloseInvitesDialog }
      title={`Add members`}
      isBlocking={ false }
      closeButtonAriaLabel='Close'
    >
      { isFetchingInviteCandidates
        ? <Spinner type={ SpinnerSize.large } />
        : <div>
            { inviteError !== ''
              ? <MessageBar
                messageBarType={ MessageBarType.error }>
                {inviteError}</MessageBar>
              : null
            }
            { inviteSuccessMsg !== ''
              ? <MessageBar
                messageBarType={ MessageBarType.success }>
                {inviteSuccessMsg}</MessageBar>
              : null
            }
            <div className={dialogText}>{'Search by name or email'}</div>
            <Select
              multi={true}
              simpleValues
              clearable={false}
              name="add-members"
              value={invites}
              options={inviteCandidatesOptions}
              onChange={onInvitesChanged}
              className={`ms-Dropdown ${dropdown}`}
            />
            <DialogFooter>
              <Button onClick={ onCloseInvitesDialog }>{'Close'}</Button>
              <PrimaryButton onClick={ onSubmitNewMembersClicked }>{'Add'}</PrimaryButton>
            </DialogFooter>
          </div>
      }
    </Dialog>
  )
}

export default function Profile (props) {
  return (
    <div className="ms-Grid">
      <div className={section}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={`ms-fontWeight-semibold ms-fontSize-l ${header}`}>{ 'Your profile' }</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div>{props.firstName} {props.lastName}</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={subline}>{props.email}</div>
          </div>
        </div>
      </div>
      <div className={section}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={`ms-fontWeight-semibold ms-fontSize-l ${header}`}>{ 'Team' }</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            { props.team.name
              ? <div>
                  <div>{props.team.name}</div>
                  <div className={link} onClick={props.onAddMembersClicked}>{'add members'}</div>
                  <AddMembersDialog
                    isInvitesDialogOpened={props.isInvitesDialogOpened}
                    team={props.team.name}
                    invites={props.invites}
                    inviteCandidatesOptions={props.inviteCandidatesOptions}
                    inviteError={props.inviteError}
                    inviteSuccessMsg={props.inviteSuccessMsg}
                    onCloseInvitesDialog={props.onCloseInvitesDialog}
                    onInvitesChanged={props.onInvitesChanged}
                    onSubmitNewMembersClicked={props.onSubmitNewMembersClicked}
                  />
                </div>
              : <div className={subline}>{'You are not part of an team. Join one to share your contacts with team members.'}</div>
            }
          </div>
        </div>
      </div>
      <div className={section}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            { props.isDownloading
              ? <Spinner type={ SpinnerSize.medium } label="Exporting..."/>
              : <PrimaryButton className={blockBtn} onClick={props.onExportContacts}>{ 'Export your contacts' }</PrimaryButton>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
