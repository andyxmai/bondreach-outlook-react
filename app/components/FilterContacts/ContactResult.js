import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { contactStyle, inline, name, company } from './styles.css'
import { formatInvestmentSizePreferences } from 'helpers/utils'

export default function ContactResult ({contact}) {
  return (
    <div className={contactStyle}>
      <Link to={`/view-contact/${contact.id}`}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={name}>{`${contact.firstName} ${contact.lastName}`}</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <div className={company}>{contact.company}</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            {contact.investmentTypePreferences.map((type) => (
              <span key={type.id} className={inline}>{type.name}</span>
            ))}
            <span key="size-preference" className={inline}>
              {formatInvestmentSizePreferences(contact.minimumInvestmentSize, contact.maximumInvestmentSize)}
            </span>
            {contact.regionPreferences.map((region) => (
              <span key={region.id} className={inline}>{region.name}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
