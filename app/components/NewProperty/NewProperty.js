import React, { PropTypes } from 'react'
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, InputGroup, Button } from 'react-bootstrap'
import { container, title, formLabel, formHeader } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'
import Cleave from 'cleave.js/dist/cleave-react'

export default function NewProperty (props) {
  return (
    <div className={container}>
      <Panel>
        <h3 className={title}>New Property</h3>
        <div>
          <Form horizontal>
            <div className={formHeader}>{'Property Information'}</div>
            <FormGroup controlId="propertyName">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Property name'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="streetAddress">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Street address'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="city">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'City'}</span>
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="state">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'State'}</span>
              </Col>
              <Col sm={2}>
                <FormControl type="text" placeholder="" />
              </Col>
            </FormGroup>

            <FormGroup controlId="propertyType">
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

            <FormGroup controlId="propertySize">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Property size'}</span>
              </Col>
              <Col sm={4}>
                <InputGroup>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  />
                  <InputGroup.Addon>sqft</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="purchasePrice">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Purchase price'}</span>
              </Col>
              <Col sm={6}>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  />
                </InputGroup>
              </Col>
            </FormGroup>
            <br/>

            { /* Report Information */ }
            <div className={formHeader}>{'Report Information'}</div>
            <FormGroup controlId="analysisStartDate">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Analysis start date'}</span>
              </Col>
              <Col sm={3}>
              <Cleave className="form-control" placeholder="MM/YYYY"
                options={{date: true, datePattern: ['m', 'Y']}}
              />
              </Col>
            </FormGroup>

            <FormGroup controlId="endDate">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'End date'}</span>
              </Col>
              <Col sm={3}>
                <Cleave className="form-control" placeholder="MM/YYYY"
                  options={{date: true, datePattern: ['m', 'Y']}}
                />
              </Col>
            </FormGroup>
            <br/>

            { /* Assumption */ }
            <div className={formHeader}>{'Assumptions'}</div>
            <FormGroup controlId="inflationGrowth">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Inflation growth'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="rentGrowth">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Rent growth'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup controlId="vacancyRate">
              <Col componentClass={ControlLabel} sm={3}>
                <span className={formLabel}>{'Vacancy rate'}</span>
              </Col>
              <Col sm={3}>
                <InputGroup>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
            <br/>

            <FormGroup>
              <Col smOffset={6} sm={3}>
                <Button type="submit" className={btnBlue} block onClick={props.handleSubmit}>
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
