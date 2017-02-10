import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import ReactDataGrid from 'react-data-grid'
import FaClose from 'react-icons/lib/fa/close'
import { FormGroup, FormControl, ControlLabel, Radio, Col, Row, ButtonToolbar, Button, InputGroup } from 'react-bootstrap'
import Cleave from 'cleave.js/dist/cleave-react'
import { container, buttons, formLabel, formGroup, formSubLabel, multiLabelFormGroup } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'
import { modalTitle, pointer, selectField } from 'sharedStyles/styles.css'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

const modalStyles = {
  content: {
    width: '50%',
    height: 400,
    margin: '0px auto',
    border: '1px solid #D7DADA',
    borderRadius: 3,
    padding: 20,
  },
  overlay : {
    backgroundColor: 'rgba(0,0,0,.6)'
  },
}

const reimbursementsTypeOptions = [
    { value: 'baseYear', label: 'Base Year' },
    { value: 'expenseStop', label: 'Expense Stop' }
]

const tenantImprovementsUnitOptions = [
    { value: 'sqft', label: '/sqft' },
]

const leasingCommissionsUnitOptions = [
    { value: 'percent', label: 'percent' },
    { value: 'dollars', label: 'dollars' },
]

export default function RentRollModal (props) {
  return (
    <Modal
      isOpen={props.isModalOpened}
      onRequestClose={props.closeModal}
      style={modalStyles}
      contentLabel="Modal"
      >
      <div className={pointer} onClick={props.closeModal}><FaClose /></div>
      { props.selectedColumnKey === 'reimbursementsDisplayName'
        ? <div>
            { props.tenantName !== ''
              ? <div className={modalTitle}>{`Reimbursements for ${props.tenantName}`}</div>
              : <div className={modalTitle}>{`Reimbursements for tenant`}</div>
            }
            <div>
              <form>

                <Row className={formGroup}>
                  <FormGroup controlId="formBasicText">
                    <Col sm={5} smOffset={3}>
                      <ControlLabel className={formLabel}>{'Reimbursements type'}</ControlLabel>
                      <Select
                          name="reimbursements-type"
                          value={props.reimbursementsType}
                          options={reimbursementsTypeOptions}
                          onChange={props.handleReimbursementsTypeChanged}
                          clearable={false}
                          searchable={false}
                          className={selectField}
                      />
                    </Col>
                  </FormGroup>
                </Row>

                { props.reimbursementsType === 'expenseStop'
                  ? <Row className={formGroup}>
                      <FormGroup controlId="formBasicText">
                        <Col sm={4} smOffset={3}>
                          <ControlLabel className={formLabel}>{'Reimbursements'}</ControlLabel>
                          <InputGroup>
                            <Cleave placeholder='' className="form-control"
                              options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                              onChange={props.handleReimbursementsChanged} value={props.reimbursements}
                            />
                            <InputGroup.Addon>/sqft</InputGroup.Addon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    </Row>
                  : null
                }

                <div><br/></div>

                <Row className={formGroup}>
                  <Col sm={7} smOffset={5}>
                    <ButtonToolbar className={buttons}>
                      <Button onClick={props.closeModal}>{'Cancel'}</Button>
                      <Button onClick={props.handleReimbursementsSubmission} className={btnBlue}>{'Save reimbursements'}</Button>
                    </ButtonToolbar>
                  </Col>
                </Row>

              </form>
            </div>
          </div>

        : <div>
            { props.tenantName !== ''
              ? <div className={modalTitle}>{`Leasing costs for ${props.tenantName}`}</div>
              : <div className={modalTitle}>{`Leasing costs for tenant`}</div>
            }
            <div>
              <form>

                <Row className={multiLabelFormGroup}>
                  <FormGroup controlId="formBasicText">
                    <div className={formLabel}>{'Tenant improvements'}</div>
                    <Col sm={3}>
                      <ControlLabel className={formSubLabel}>{'amount'}</ControlLabel>
                      <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <Cleave className="form-control"
                          options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                          onChange={props.handleTenantImprovementsChanged} value={props.leasingCostTenantImprovements}
                        />
                      </InputGroup>
                    </Col>
                    <Col sm={4}>
                      <ControlLabel className={formSubLabel}>{'unit'}</ControlLabel>
                      <Select
                          name="tenant-improvements-unit"
                          value={props.leasingCostTenantImprovementsUnit}
                          options={tenantImprovementsUnitOptions}
                          onChange={props.handleTenantImprovementsUnitChanged}
                          clearable={false}
                          searchable={false}
                          className={selectField}
                      />
                    </Col>
                  </FormGroup>
                </Row>

                <Row className={multiLabelFormGroup}>
                  <FormGroup controlId="formBasicText">
                    <div className={formLabel}>{'Leasing commissions'}</div>
                    <Col sm={3}>
                      <ControlLabel className={formSubLabel}>{'amount'}</ControlLabel>
                      <Cleave className="form-control"
                        options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                        onChange={props.handleLeasingCommissionsAmountChanged} value={props.leasingCostLeasingCommissions}
                      />
                    </Col>
                    <Col sm={4}>
                      <ControlLabel className={formSubLabel}>{'unit'}</ControlLabel>
                      <Select
                          name="leasing-commissions-unit"
                          value={props.leasingCostLeasingCommissionsUnit}
                          options={leasingCommissionsUnitOptions}
                          onChange={props.handleLeasingCommissionsUnitChanged}
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
                      <Button onClick={props.handleLeasingCostsSubmission} className={btnBlue}>{'Save costs'}</Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
      }
    </Modal>
  )
}
