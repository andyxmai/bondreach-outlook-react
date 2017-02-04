import React, { PropTypes } from 'react'
import { ExpenseTableContainer } from 'containers'
import { container, title, subtitle, subtitleElem } from './styles.css'

function ExpenseSection ({title}) {
  return (
    <div>
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
      <div>
        <ExpenseSection title={'Reimbursable Expenses'} />
      </div>
    </div>
  )
}
