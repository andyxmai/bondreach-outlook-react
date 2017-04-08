import React, { PropTypes } from 'react'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import Select from 'react-select'
import { header, section, subline } from './styles.css'
import { blockBtn, dropdown } from 'sharedStyles/styles.css'

function AddMembersDialog ({isInvitesDialogOpened, team, invites, inviteCandidatesOptions, onCloseInvitesDialog, onInvitesChanged}) {
  return (
    <Dialog
      isOpen={ isInvitesDialogOpened }
      type={ DialogType.close }
      onDismiss={ onCloseInvitesDialog }
      title={`Add members to ${team}`}
      isBlocking={ false }
      closeButtonAriaLabel='Close'
    >
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
        <PrimaryButton onClick={ onCloseDialog }>Invite</PrimaryButton>
      </DialogFooter>
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
                  <div>{'add team members'}</div>
                  <AddMembersDialog
                    isInvitesDialogOpened={props.isInvitesDialogOpened}
                    team={props.team.name}
                    invites={props.invites}
                    onCloseDialog={props.onCloseDialog}
                    onInvitesChanged={props.onInvitesChanged}
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
