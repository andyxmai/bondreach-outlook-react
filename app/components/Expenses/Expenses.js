import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { PageHeaderContainer, ExpenseTableContainer } from 'containers'
import { container, title, subtitle, subtitleElem, actionButtonContainer, spacer, expenseTitle, section, propertyInfo, pageTitle } from './styles.css'
import { btnBlue, btnGray } from 'sharedStyles/buttons.css'

function ExpenseSection ({title}) {
  return (
    <div>
      <div className={expenseTitle}>
        {title}
      </div>
      <ExpenseTableContainer />
    </div>
  )
}

export default function Expenses (props) {
  return (
    <div className={container}>
      <PageHeaderContainer
        title={'Expenses & Expenditures'}
      />
      <div className={section}>
        <ExpenseSection title={'Reimbursable Expenses'} />
      </div>
      {/*<div className={section}>
        <ExpenseSection title={'Capital Expenditures'} />
      </div>*/}
      <div className={actionButtonContainer}>
        <Button className={btnBlue} onClick={props.goToRentRoll}>{'Go to rent roll'}</Button>
      </div>
    </div>
  )
}
