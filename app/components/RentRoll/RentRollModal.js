import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import ReactDataGrid from 'react-data-grid'
import FaClose from 'react-icons/lib/fa/close'
import { FormGroup, FormControl, ControlLabel, Radio, Col, Row, ButtonToolbar, Button, InputGroup } from 'react-bootstrap'
import Cleave from 'cleave.js/dist/cleave-react'
import { container, buttons, formLabel, formGroup } from './styles.css'
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
    backgroundColor: 'rgba(28, 28, 28, 0.75)'
  },
}

const reimbursementsTypeOptions = [
    { value: 'baseYear', label: 'Base Year' },
    { value: 'expenseStop', label: 'Expense Stop' }
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
      <div className={modalTitle}>{'Reimbursements'}</div>
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
    </Modal>
  )
}
