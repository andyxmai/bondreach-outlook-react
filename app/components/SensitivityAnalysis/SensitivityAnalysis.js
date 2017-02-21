import React, { PropTypes } from 'react'
import { CashflowTableContainer } from 'containers'
import { Panel, Button, Row, Col, Form, FormGroup, FormControl, ControlLabel, InputGroup, HelpBlock } from 'react-bootstrap'
import { container, title, inputs, actionContainer, action, formLabel, section, disclaimer, buttonContainer, titleContainer, resultsContainer } from './styles.css'
import { btnBlue, btnRedInverse } from 'sharedStyles/buttons.css'
import Cleave from 'cleave.js/dist/cleave-react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const inputOptions = [
    { value: 'assumptions', label: 'Assumptions' },
    { value: 'expenses', label: 'Expenses (coming soon...)' },
    { value: 'rentRoll', label: 'Rent Roll (coming soon...)' },
]

function AssumptionsSection (props) {
  return (
    <div>
      <Row>
        <div>
          <Col sm={5}>
            <div>
              <Panel>
                <Form horizontal>
                  <FormGroup controlId="inflationGrowth">
                    <Col componentClass={ControlLabel} sm={5}>
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
                      <HelpBlock>{'base value: 2%'}</HelpBlock>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="rentGrowth">
                    <Col componentClass={ControlLabel} sm={5}>
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
                      <HelpBlock>{'base value: 3%'}</HelpBlock>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="vacancyRate">
                    <Col componentClass={ControlLabel} sm={5}>
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
                      <HelpBlock>{'base value: 3%'}</HelpBlock>
                    </Col>
                  </FormGroup>
                </Form>
              </Panel>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  )
}

export default function SensitivityAnalysis (props) {
  return (
    <div className={container}>
      <div className={inputs}>
        <div className={disclaimer}>{'Changes made here will not be saved. This is your playground.'}</div>
        <div className={actionContainer}>
          <Select
              name="market-rent-unit"
              value='assumptions'
              options={inputOptions}
              onChange={props.handleMarketRentUnitChanged}
              clearable={false}
              searchable={false}
              className={action}
          />
        </div>
        <div className={section}>
          <AssumptionsSection />
        </div>
        <div className={buttonContainer}>
          <Button onClick={props.handleSubmit} className={btnBlue} style={{width: '200px'}}>{'Analyze'}</Button>
        </div>
      </div>
      <div className={resultsContainer}>
        <div className={titleContainer}>
          <div>{'Operating Cashflows'}</div>
          <Button onClick={props.handleSubmit} className={btnRedInverse}>{'Save this version'}</Button>
        </div>
        <CashflowTableContainer
          hideButton={true}
          toggle={props.toggle}
        />
        <br />
        <div>{'Base Analysis Operating Cashflows'}</div>
        <CashflowTableContainer
          hideButton={true}
          toggle={false}
        />
      </div>
    </div>
  )
}
