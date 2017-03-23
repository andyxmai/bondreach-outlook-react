import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { contactStyle, inline, name, company, seeProfile, preference } from './styles.css'
import { formatInvestmentSizePreferences, formatInvestmentReturnPreferences } from 'helpers/utils'

export default function ContactResult ({contact}) {
  return (
    <div className={contactStyle}>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm8 ms-u-md8 ms-u-lg8">
          <div className={name}>{`${contact.firstName} ${contact.lastName}`}</div>
        </div>
        <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
          <Link to={`/view-contact/${contact.id}`}><div className={seeProfile}>see profile</div></Link>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className={company}>{contact.company}</div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className={preference}>{contact.investmentTypePreferences.map((type) => (
            <span key={type.id} className={inline}>{type.name}</span>
          ))}</div>
          <div key="size-preference" className={`${inline} ${preference}`}>
            {formatInvestmentSizePreferences(contact.minimumInvestmentSize, contact.maximumInvestmentSize)} • {`${formatInvestmentReturnPreferences(contact.minimumIrrReturn, contact.maximumIrrReturn)} return`}
          </div>
          <div className={preference}>{contact.regionPreferences.map((region) => (
            <span key={region.id} className={inline}>{region.name}</span>
          ))}</div>
        </div>
      </div>
    </div>
  )
}
