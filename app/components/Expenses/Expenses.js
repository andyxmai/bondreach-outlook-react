import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { ExpenseTableContainer } from 'containers'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, expenseTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

function ExpenseSection ({title}) {
  return (
    <div className={expenseTitle}>
      {title}
      <ExpenseTableContainer />
    </div>
  )
}

export default function Expenses (props) {
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
        <Button className={btnBlue}>{'Go to rent roll'}</Button>
      </div>
      <div>
        <ExpenseSection title={'Reimbursable Expenses'} />
      </div>
    </div>
  )
}
