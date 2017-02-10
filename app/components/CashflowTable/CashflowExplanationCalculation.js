import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { container, subtitle, equation, formula, center } from './styles.css'

export default function CashflowExplanationCalculation (props) {
  return (
    <div className={container}>
      <div>
        <div className={subtitle}>{'Calculations'}</div>
        <Panel>
        { Object.keys(props.selectedCashflowExplanationCell).length !== 0 && props.selectedCashflowExplanationCell.constructor === Object
          ? <div>
              <div className={equation}>
                {'2,575,000 = 2,500,000 + (2,500,000 * 0.03)'}
              </div>
              <div className={formula}>
                {'01/2019 rent = 01/2018 rent + (01/2018 rent * rent growth)'}
              </div>
            </div>
          : <div className={center}>
              {'Click on a number in the cashflow table below to see detailed calculation'}
            </div>
        }
        </Panel>
      </div>
    </div>
  )
}
