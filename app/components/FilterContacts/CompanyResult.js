import React, { PropTypes } from 'react'
import { Button } from 'office-ui-fabric-react/lib/Button'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import { contactStyle, inline, name, preferenceType, seeProfile } from './styles.css'
import { formatInvestmentSizePreferences, formatInvestmentReturnPreferences } from 'helpers/utils'

export default function ContactResult ({contact, isDialogOpened, filteredCompanyContactDetail, onSeeDetailsClicked, onCloseDialog}) {
  return (
    <div className={contactStyle}>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className={name}>{contact.company}</div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div key="size-preference" className={`${inline}`}>
            {formatInvestmentSizePreferences(contact.minimumInvestmentSize, contact.maximumInvestmentSize)} • {`${formatInvestmentReturnPreferences(contact.minimumIrrReturn, contact.maximumIrrReturn)} return`}
          </div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
          <div className={seeProfile} onClick={onSeeDetailsClicked} id={contact.company}>see details</div>
        </div>
      </div>
    </div>
  )
}
