import React, { PropTypes } from 'react'
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Button } from 'react-bootstrap'
import { container, title, formLabel, formHeader } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'

export default function NewProperty (props) {
  return (
    <div className={container}>
      <Panel>
        <h3 className={title}>New Property</h3>
        <div>
          <Form horizontal>
            <div className={formHeader}>{'Property Information'}</div>
            <FormGroup controlId="propertyName" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Property name'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="streetAddress" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Street address'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="city" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'City'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="state" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'State'}</span>
              </Col>
              <Col sm={2}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="propertyType" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Property type'}</span>
              </Col>
              <Col sm={4}>
                <FormControl componentClass="select" placeholder="select">
                  <option value="office">Office</option>
                  <option value="retail">Retail</option>
                  <option value="industrials">Industrials</option>
                  <option value="mixed-used">Mixed-used</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="propertySize" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Property size'}</span>
              </Col>
              <Col sm={4}>
                <InputGroup>
                  <FormControl type="text" placeholder="" />
                  <InputGroup.Addon>sqft</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="purchasePrice" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Purchase price'}</span>
              </Col>
              <Col sm={6}>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl type="text" placeholder="" />
                </InputGroup>
              </Col>
            </FormGroup>
            <br/>

            { /* Report Information */ }
            <div className={formHeader}>{'Report Information'}</div>
            <FormGroup controlId="analysisStartDate" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Analysis start date'}</span>
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="endDate" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'End date'}</span>
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>
            <br/>

            { /* Assumption */ }
            <div className={formHeader}>{'Assumptions'}</div>
            <FormGroup controlId="inflationGrowth" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Inflation growth'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <FormControl type="text" placeholder="" />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="rentGrowth" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Rent growth'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <FormControl type="text" placeholder="" />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="vacancyRate" bsSize="large">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Vacancy rate'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <FormControl type="text" placeholder="" />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <br/>

            <FormGroup>
              <Col smOffset={6} sm={3}>
                <Button type="submit" bsSize="large" className={btnBlue} block>
                  {'Add expenses'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Panel>
    </div>
  )
}
