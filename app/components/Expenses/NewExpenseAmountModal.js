import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import ReactDataGrid from 'react-data-grid'
import FaClose from 'react-icons/lib/fa/close'
import { FormGroup, FormControl, ControlLabel, Radio, Col, Row, ButtonToolbar, Button } from 'react-bootstrap'
import Cleave from 'cleave.js/dist/cleave-react'
import { container, buttons, formLabel, formGroup, detailTable } from './styles.css'
import { btnBlue } from 'sharedStyles/buttons.css'
import { modalTitle, pointer } from 'sharedStyles/styles.css'

const modalStyles = {
  content: {
    width: '65%',
    margin: '0px auto',
    border: '1px solid #D7DADA',
    borderRadius: 3,
    padding: 20,
  },
  overlay : {
    backgroundColor: 'rgba(0,0,0,.6)'
  },
}

export default function NewExpenseAmountModal (props) {
  const rowHeight = 35
  function getHeight () {
    return rowHeight * (props.rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return props.rows[i]
  }

  return (
    <Modal
      isOpen={props.amountModalOpened}
      onRequestClose={props.closeModal}
      style={modalStyles}
      contentLabel="Modal"
      >
      <div className={pointer} onClick={props.closeModal}><FaClose /></div>
      { props.selectedExpenseName === ''
        ? <div className={modalTitle}>{'Enter amount for new expense'}</div>
        : <div className={modalTitle}>{`Enter amount for ${props.selectedExpenseName}`}</div>
      }
      <div>
        <form>
          <Row className={formGroup}>
            <FormGroup bsSize="large">
              <Col sm={8} smOffset={2}>
                <div><ControlLabel className={formLabel}>{'Type'}</ControlLabel></div>
                <Radio name='amountType' value='simple' checked={props.amountType === 'simple'} inline onChange={props.onTypeChange}>
                  {'Simple'}
                </Radio>
                {' '}
                <Radio name='amountType' value='detail' checked={props.amountType === 'detail'} inline onChange={props.onTypeChange}>
                  {'Detail'}
                </Radio>
              </Col>
            </FormGroup>
          </Row>
          { props.amountType === 'simple'
            ? <div>
                <Row className={formGroup}>
                  <FormGroup controlId="formBasicText" bsSize="large">
                    <Col sm={4} smOffset={2}>
                      <ControlLabel className={formLabel}>{'Amount'}</ControlLabel>
                      <Cleave placeholder='Enter amount' className="form-control"
                        options={ {numeral: true, numeralThousandsGroupStyle: 'thousand'} }
                        onChange={props.handleAmountChanged} value={props.amount}
                      />
                    </Col>
                    <Col sm={2}>
                      <ControlLabel className={formLabel}>{'Unit'}</ControlLabel>
                      <FormControl componentClass="select" placeholder="select" value={props.unit} onChange={props.handleUnitChanged}>
                        <option value="dollars">{'dollars'}</option>
                        <option value="area">{'/ sqft property size'}</option>
                        <option value="egr">{'% of EGR'}</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className={formGroup}>
                  <FormGroup bsSize="large">
                    <Col sm={4} smOffset={2}>
                      <ControlLabel className={formLabel}>{'Frequency'}</ControlLabel>
                      <FormControl componentClass="select" placeholder="select frequency" value={props.frequency} onChange={props.handleFrequencyChanged}>
                        <option value="annually">{'Annually'}</option>
                        <option value="monthly">{'Monthly'}</option>
                        <option value="quarterly">{'Quarterly'}</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                </Row>
              </div>
            : <div className={detailTable}>
                <ReactDataGrid
                  columns={props.columns}
                  rowGetter={rowGetter}
                  rowsCount={props.rows.length}
                  rowHeight={rowHeight}
                  minHeight={getHeight()}
                  enableCellSelect={true}
                  onCellSelected={props.onCellSelected}
                  onRowUpdated={props.handleRowUpdated}
                  />
              </div>
          }
          <Row className={formGroup}>
            <Col sm={8} smOffset={2}>
              <ButtonToolbar className={buttons}>
                <Button onClick={props.closeModal}>{'Cancel'}</Button>
                <Button onClick={props.handleSubmit} className={btnBlue}>{'Add amount'}</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </form>
      </div>
    </Modal>
  )
}
