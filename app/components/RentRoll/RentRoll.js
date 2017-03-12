import React, { PropTypes } from 'react'
import { PageHeaderContainer, MLATableContainer } from 'containers'
import { Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, tableSpacer, sectionTitle, section, propertyInfo, pageTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

export default function RentRoll (props) {
  return (
    <div className={container}>
      <PageHeaderContainer
        title={'Market Leasing Assumptions & Rent Roll'}
      />
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
      </div>
    </div>
  )
}
