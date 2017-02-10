import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import ReactDataGrid from 'react-data-grid'
import FaClose from 'react-icons/lib/fa/close'
import { FormGroup, FormControl, ControlLabel, Radio, Col, Row, ButtonToolbar, Button, InputGroup } from 'react-bootstrap'
import Cleave from 'cleave.js/dist/cleave-react'
import { container, buttons, formLabel, formGroup, formSubLabel } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'
import { modalTitle, pointer, selectField } from 'sharedStyles/styles.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

const modalStyles = {
  content: {
    width: '50%',
    margin: '0px auto',
    border: '1px solid #D7DADA',
    borderRadius: 3,
    padding: 20,
  },
  overlay : {
    backgroundColor: 'rgba(0,0,0,.6)'
  },
}

const marketRentUnitOptions = [
    { value: 'sqftmonth', label: '/sqft/month' },
    { value: 'sqftyear', label: '/sqft/year' }
]

const reimbursementsOptions = [
    { value: 'none', label: 'None' },
    { value: 'net', label: 'Net' },
    { value: 'basestop', label: 'Base Stop' },
]

const rentChangesUnitOptions = [
    { value: 'percentyear', label: '%/year' },
    { value: 'sqftyear', label: 'sqft/year' }
]

const termLengthUnitOptions = [
    { value: 'year', label: 'year' },
    { value: 'month', label: 'month' }
]

export default function NewMLAModal (props) {
  return (
    <Modal
      isOpen={props.isModalOpened}
      onRequestClose={props.closeModal}
      style={modalStyles}
      contentLabel="Modal"
      >
      <div className={pointer} onClick={props.closeModal}><FaClose /></div>
      <div className={modalTitle}>{'New Market Leasing Assumption'}</div>
      <div>
        <form>
          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Name'}</div>
              <Col sm={6}>
                <FormControl type="text"
                  onChange={props.handleNameChanged} value={props.name}
                />
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Renewal probability'}</div>
              <Col sm={3}>
                <InputGroup>
                  <Cleave placeholder='' className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleRenewalProbabilityChanged} value={props.renewalProbilitity}
                  />
                  <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Market rent'}</div>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'new'}</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleMarketRentNewChanged} value={props.marketRentNew}
                  />
                </InputGroup>
              </Col>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'renew'}</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleMarketRentRenewChanged} value={props.marketRentRenew}
                  />
                </InputGroup>
              </Col>
              <Col sm={4}>
                <ControlLabel className={formSubLabel}>{'unit'}</ControlLabel>
                <Select
                    name="market-rent-unit"
                    value={props.marketRentUnit}
                    options={marketRentUnitOptions}
                    onChange={props.handleMarketRentUnitChanged}
                    clearable={false}
                    searchable={false}
                    className={selectField}
                />
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Months vacant'}</div>
              <Col sm={3}>
                <InputGroup>
                  <Cleave placeholder='' className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleMonthsVacantChanged} value={props.monthsVacant}
                  />
                  <InputGroup.Addon>mo.</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Tenant improvements'}</div>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'new'}</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleTenantImprovementNewChanged} value={props.tenantImprovementNew}
                  />
                </InputGroup>
              </Col>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'renew'}</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <Cleave className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleTenantImprovementRenewChanged} value={props.tenantImprovementRenew}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Rent abatement'}</div>
              <Col sm={3}>
                <InputGroup>
                  <Cleave placeholder='' className="form-control"
                    options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                    onChange={props.handleRentAbatementChanged} value={props.rentAbatement}
                  />
                  <InputGroup.Addon>mo.</InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Rent changes'}</div>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'amount'}</ControlLabel>
                <Cleave className="form-control"
                  options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  onChange={props.handleRentChangesAmountChanged} value={props.rentChangesAmount}
                />
              </Col>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'unit'}</ControlLabel>
                <Select
                    name="rent-changes-unit"
                    value={props.rentChangesUnit}
                    options={rentChangesUnitOptions}
                    onChange={props.handleRentChangesUnitChanged}
                    clearable={false}
                    searchable={false}
                    className={selectField}
                />
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Reimbursements'}</div>
              <Col sm={4}>
                <Select
                    name="reimbursements"
                    value={props.reimbursements}
                    options={reimbursementsOptions}
                    onChange={props.handleReimbursementsChanged}
                    clearable={false}
                    searchable={false}
                    className={selectField}
                />
              </Col>
            </FormGroup>
          </Row>

          <Row className={formGroup}>
            <FormGroup controlId="formBasicText">
              <div className={formLabel}>{'Term length'}</div>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'number'}</ControlLabel>
                <Cleave className="form-control"
                  options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                  onChange={props.handleTermLengthChanged} value={props.termLength}
                />
              </Col>
              <Col sm={3}>
                <ControlLabel className={formSubLabel}>{'unit'}</ControlLabel>
                <Select
                    name="term-length-unit"
                    value={props.termLengthUnit}
                    options={termLengthUnitOptions}
                    onChange={props.handleTermLengthUnitChanged}
                    clearable={false}
                    searchable={false}
                    className={selectField}
                />
              </Col>
            </FormGroup>
          </Row>
          <div><br/></div>
          <Row className={formGroup}>
            <Col sm={7} smOffset={5}>
              <ButtonToolbar className={buttons}>
                <Button onClick={props.closeModal}>{'Cancel'}</Button>
                <Button onClick={props.handleSubmit} className={btnBlue}>{'Save MLA'}</Button>
              </ButtonToolbar>
            </Col>
          </Row>

        </form>
      </div>
    </Modal>
  )
}
