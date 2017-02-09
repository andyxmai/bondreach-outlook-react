import React, { PropTypes } from 'react'
import { MLATableContainer, RentRollTableContainer } from 'containers'
import { Button, Panel } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, tableSpacer, sectionTitle, section, propertyInfo, pageTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

export default function RentRoll (props) {
  return (
    <div className={container}>
      <div className={propertyInfo}>
        <div className={title}>{'Millennium Business Center'}</div>
        <div className={subtitle}>
          <div className={subtitleElem}>{'San Francisco, CA'}</div>
          <div className={subtitleElem}>{'Office'}</div>
          <div className={subtitleElem}>{'50,000 sqft'}</div>
        </div>
      </div>
      <div className={pageTitle}>{'Market Leasing Assumptions & Rent Roll'}</div>
      {/*<div className={actionButtonContainer}>
        <Button className={btnGray}>{'Cancel'}</Button>
        <div className={spacer}></div>
        <Button className={btnBlue}>{'Go to property'}</Button>
      </div>*/}
      <div className={section}>
        <Panel>
          <div className={sectionTitle}>
            {'Market Leasing Assumptions'}
          </div>
          <MLATableContainer />
        </Panel>
      </div>
      <div className={section}>
        <Panel>
          <div className={sectionTitle}>
            {'Rent Roll'}
          </div>
          <RentRollTableContainer />
        </Panel>
      </div>
    </div>
  )
}
