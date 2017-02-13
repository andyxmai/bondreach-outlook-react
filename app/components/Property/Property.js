import React, { PropTypes } from 'react'
import { Panel, Form, FormGroup, FormControl, Col, Row, ControlLabel, InputGroup, Button } from 'react-bootstrap'
import { container, pageTitle, section, sectionTitle, formHeader, formLabel, form, horizontalForms, horizontalForm } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'
import { selectField } from 'sharedStyles/styles.css'
import Cleave from 'cleave.js/dist/cleave-react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const propertyTypeOptions = [
    { value: 'office', label: 'Office' },
    { value: 'retail', label: 'Retail' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'mixedUse', label: 'Mixed-Use' },
]

export default function Property (props) {
  return (
    <div className={container}>
      <div className={pageTitle}>{'Property & Assumptions'}</div>
      <div className={section}>
        <div className={sectionTitle}>
          {'Property Information'}
        </div>

        <Row>
          <div className={form}>
            <Panel>
              <Form horizontal>
                <FormGroup controlId="propertyName">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'Property name'}</span>
                  </Col>
                  <Col sm={6}>
                    <FormControl type="text" placeholder="" value={props.name}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="streetAddress">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'Street address'}</span>
                  </Col>
                  <Col sm={6}>
                    <FormControl type="text" placeholder="" value={props.streetAddress} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="city">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'City'}</span>
                  </Col>
                  <Col sm={6}>
                    <FormControl type="text" placeholder="" value={props.city} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="state">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'State'}</span>
                  </Col>
                  <Col sm={2}>
                    <FormControl type="text" placeholder="" value={props.state}/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="propertyType">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'Property type'}</span>
                  </Col>
                  <Col sm={4}>
                    <FormControl componentClass="select" placeholder="select" value={props.type}>
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
                        value={props.size}
                      />
                      <InputGroup.Addon>sqft</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup controlId="purchasePrice">
                  <Col componentClass={ControlLabel} sm={3}>
                    <span className={formLabel}>{'Purchase price'}</span>
                  </Col>
                  <Col sm={4}>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                      <Cleave className="form-control"
                        options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                        value={props.price}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={6} sm={3}>
                    <Button type="submit" className={btnBlue} block>
                      {'Save changes'}
                    </Button>
                  </Col>
                </FormGroup>

              </Form>
            </Panel>
          </div>
        </Row>
        <br/>

        <Row>
          <div className={horizontalForms}>
            <Col sm={6}>
              <div className={sectionTitle}>
                {'Report Information'}
              </div>
              <div className={horizontalForm}>
                <Panel>
                  <Form horizontal>
                    <FormGroup controlId="analysisStartDate">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'Analysis start date'}</span>
                      </Col>
                      <Col sm={5}>
                      <Cleave className="form-control" placeholder="MM/YYYY"
                        options={{date: true, datePattern: ['m', 'Y']}}
                        value={props.analysisStartDate}
                      />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="reportStartDate">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'Report start date'}</span>
                      </Col>
                      <Col sm={5}>
                        <Cleave className="form-control" placeholder="MM/YYYY"
                          options={{date: true, datePattern: ['m', 'Y']}}
                          value={props.reportStartDate}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="endDate">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'End date'}</span>
                      </Col>
                      <Col sm={5}>
                        <Cleave className="form-control" placeholder="MM/YYYY"
                          options={{date: true, datePattern: ['m', 'Y']}}
                          value={props.endDate}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={6} sm={5}>
                        <Button type="submit" className={btnBlue} block>
                          {'Save changes'}
                        </Button>
                      </Col>
                    </FormGroup>

                  </Form>
                </Panel>
              </div>
            </Col>
            <Col sm={6}>
              <div className={sectionTitle}>
                {'Assumptions'}
              </div>
              <div className={horizontalForm}>
                <Panel>
                  <Form horizontal>
                    <FormGroup controlId="inflationGrowth">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'Inflation growth'}</span>
                      </Col>
                      <Col sm={5}>
                        <InputGroup>
                          <Cleave className="form-control"
                            options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                            value={props.inflation}
                          />
                          <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="rentGrowth">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'Rent growth'}</span>
                      </Col>
                      <Col sm={5}>
                        <InputGroup>
                          <Cleave className="form-control"
                            options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                            value={props.rentGrowth}
                          />
                          <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="vacancyRate">
                      <Col componentClass={ControlLabel} sm={6}>
                        <span className={formLabel}>{'Vacancy rate'}</span>
                      </Col>
                      <Col sm={5}>
                        <InputGroup>
                          <Cleave className="form-control"
                            options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                            value={props.vacancyRate}
                          />
                          <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={6} sm={5}>
                        <Button type="submit" className={btnBlue} block>
                          {'Save changes'}
                        </Button>
                      </Col>
                    </FormGroup>

                  </Form>
                </Panel>
              </div>
            </Col>
          </div>
        </Row>

      </div>
    </div>
  )
}
