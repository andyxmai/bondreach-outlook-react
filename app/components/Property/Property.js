import React, { PropTypes } from 'react'
import { CashflowTableContainer, TenantCashflowsContainer } from 'containers'
import { Tabs, Tab, Form, FormGroup, FormControl, Col, ControlLabel, Panel, ButtonGroup, Button } from 'react-bootstrap'
import { container, title, subtitle, subtitleElem, tabsContainer, headerContainer, formLabel } from './styles.css'
import { btnGrayInverse, btnGray } from 'sharedStyles/buttons.css'

export default function Home (props) {
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
      <div className={tabsContainer}>
        <Tabs defaultActiveKey={3} animation={false} id="property">
          <Tab eventKey={1} title='Dashboard'>
            {'Dashboard'}
          </Tab>
          <Tab eventKey={2} title='Cashflows'>
            <CashflowTableContainer />
          </Tab>
          <Tab eventKey={3} title='Tenants'>
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
        </Tabs>
      </div>
    </div>
  )
}
