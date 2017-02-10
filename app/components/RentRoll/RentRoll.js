import React, { PropTypes } from 'react'
import { MLATableContainer, RentRollTableContainer } from 'containers'
import { Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, tableSpacer, sectionTitle, section, propertyInfo, pageTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

export default function RentRoll (props) {
  return (
    <div className={container}>
      <div className={pageTitle}>{'Market Leasing Assumptions & Rent Roll'}</div>
      {/*<div className={actionButtonContainer}>
        <Button className={btnGray}>{'Cancel'}</Button>
        <div className={spacer}></div>
        <Button className={btnBlue}>{'Go to property'}</Button>
      </div>*/}
      <div className={section}>
        <div className={sectionTitle}>
          {'Market Leasing Assumptions'}
        </div>
        <MLATableContainer />
      </div>
      <div className={section}>
        <div className={sectionTitle}>
          {'Rent Roll'}
        </div>
        <RentRollTableContainer />
      </div>
    </div>
  )
}
