import React, { PropTypes } from 'react'
import { CashflowTableContainer, TenantCashflowsContainer, SensitivityAnalysisContainer } from 'containers'
import { Tabs, Tab, Form, FormGroup, FormControl, Col, ControlLabel, Panel, ButtonGroup, Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, tabsContainer, headerContainer, formLabel, propertyInfo, pageTitle } from './styles.css'
import { btnGrayInverse, btnGray } from 'sharedStyles/buttons.css'

export default function Cashflows (props) {
  return (
    <div className={container}>
      <div className={pageTitle}>{'Cashflows'}</div>
      <div className={tabsContainer}>
        <Tabs defaultActiveKey={3} animation={false} id="property">
          <Tab eventKey={1} title='Cashflows'>
            <CashflowTableContainer />
          </Tab>
          <Tab eventKey={2} title='Tenants'>
            <div className={headerContainer}>
              <div style={{width: '300px'}}>
                <Form>
                  <FormGroup controlId="">
                      <FormControl componentClass="select" placeholder="select">
                        <option value="all">{'All tenants'}</option>
                        <option value="doordash">{'DoorDash'}</option>
                      </FormControl>
                  </FormGroup>
                </Form>
              </div>
              <div>
                <ButtonGroup>
                  <Button bsSize="small" className={btnGrayInverse}>Nominal</Button>
                  <Button bsSize="small" className={btnGray}>Per Sqft</Button>
                </ButtonGroup>
              </div>
            </div>
            <Panel>
              <TenantCashflowsContainer />
            </Panel>
          </Tab>
          <Tab eventKey={3} title='Sensitivity Analysis'>
            <SensitivityAnalysisContainer />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
