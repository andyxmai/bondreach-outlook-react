import React, { PropTypes } from 'react'
import {  PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import {  Label } from 'office-ui-fabric-react/lib/Label'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { blockBtn } from 'sharedStyles/styles.css'

export default function Authenticate (props) {
  return (
    <div>
      { props.isFetching
        ? <div><Spinner type={ SpinnerType.large } label='Logging in...' /></div>
        : <div className="ms-Grid">
            { props.error !== ''
              ? <MessageBar
                messageBarType={ MessageBarType.error }
                >
                {props.error}</MessageBar>
              : null
            }
            <br />
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <Label className="ms-u-textAlignCenter"><b>{'Click below to log in or sign up!'}</b></Label>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <PrimaryButton
                  data-automation-id='authenticate'
                  onClick={props.onAuth}
                  className={blockBtn}
                  >
                  {'Authenticate with Outlook'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        }
    </div>
  )
}
