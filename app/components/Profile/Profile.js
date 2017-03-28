import React, { PropTypes } from 'react'
import { subline } from './styles.css'

export default function Profile (props) {
  return (
    <div className="ms-Grid">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className="ms-fontWeight-semibold ms-fontSize-l">{ 'Your profile' }</div>
        </div>
      </div>
      <br />
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
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className={subline}>{props.company.name}</div>
        </div>
      </div>
    </div>
  )
}
