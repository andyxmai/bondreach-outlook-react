import React, { PropTypes } from 'react'
import { MLATableContainer, RentRollTableContainer } from 'containers'
import { Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, tableSpacer, sectionTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

export default function RentRoll (props) {
  return (
    <div className={container}>
      <div>
        <div className={title}>{'Millennium Business Center'}</div>
        <div className={subtitle}>
          <div className={subtitleElem}>{'San Francisco, CA'}</div>
          <div className={subtitleElem}>{'Office'}</div>
          <div className={subtitleElem}>{'50,000 sqft'}</div>
        </div>
      </div>
      <div className={actionButtonContainer}>
        <Button className={btnGray}>{'Cancel'}</Button>
        <div className={spacer}></div>
        <Button className={btnBlue}>{'Go to property'}</Button>
      </div>
      <div>
        <div className={sectionTitle}>
          {'Market Leasing Assumptions'}
        </div>
        <MLATableContainer />
      </div>
      <div className={tableSpacer}>
      </div>
      <div>
        <div className={sectionTitle}>
          {'Rent Roll'}
        </div>
        <RentRollTableContainer />
      </div>
    </div>
  )
}
