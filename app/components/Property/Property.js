import React, { PropTypes } from 'react'
import { CashflowTableContainer, TenantCashflowsContainer } from 'containers'
import { Tabs, Tab, Form, FormGroup, FormControl, Col, ControlLabel, Panel, ButtonGroup, Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, tabsContainer, headerContainer, formLabel, propertyInfo, pageTitle } from './styles.css'
import { btnGrayInverse, btnGray } from 'sharedStyles/buttons.css'

export default function Home (props) {
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
      <div className={pageTitle}>{'Cashflows'}</div>
      <div className={tabsContainer}>
        <Tabs defaultActiveKey={1} animation={false} id="property">
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
            {'Sensitivity Analysis'}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
