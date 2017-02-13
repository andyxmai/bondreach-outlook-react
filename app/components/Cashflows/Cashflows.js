import React, { PropTypes } from 'react'
import { CashflowTableContainer, TenantCashflowsContainer, SensitivityAnalysisContainer } from 'containers'
import { Tabs, Tab, Form, FormGroup, FormControl, Col, ControlLabel, Panel, ButtonGroup, Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, tabsContainer, formLabel, propertyInfo, pageTitle } from './styles.css'
import { btnGrayInverse, btnGray } from 'sharedStyles/buttons.css'

export default function Cashflows (props) {
  return (
    <div className={container}>
      <div className={pageTitle}>{'Cashflows'}</div>
      <div className={tabsContainer}>
        <Tabs defaultActiveKey={1} animation={false} id="property">
          <Tab eventKey={1} title='Operating Cashflows'>
            <CashflowTableContainer />
          </Tab>
          <Tab eventKey={2} title='Tenants'>
            <TenantCashflowsContainer />
          </Tab>
          <Tab eventKey={3} title='Sensitivity Analysis'>
            <SensitivityAnalysisContainer />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
