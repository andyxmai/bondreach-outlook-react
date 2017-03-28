import React, { PropTypes } from 'react'
import { header, section, subline } from './styles.css'

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
            <div className={`ms-fontWeight-semibold ms-fontSize-l ${header}`}>{ 'Organization' }</div>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            { props.company.name
              ? <div>{props.company.name}</div>
              : <div className={subline}>{'You are not part of an organization. Join one to share your contacts.'}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
