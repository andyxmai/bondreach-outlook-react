import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { container, subtitle, equation, formula, center } from './styles.css'

export default function CashflowExplanationCalculation (props) {
  return (
    <div className={container}>
      <div>
        <div className={subtitle}>{'Calculations'}</div>
        <Panel>
        { props.showExplanationCalculation === true
          ? <div>
              <div className={equation}>
                {props.explanationCalculation.equation}
              </div>
              <div className={formula}>
                {props.explanationCalculation.formula}
              </div>
            </div>
          : <div className={center}>
              {'Click on a number in the cashflow table above to see detailed calculation'}
            </div>
        }
        </Panel>
      </div>
    </div>
  )
}
