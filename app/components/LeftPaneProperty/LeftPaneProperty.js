import React, { PropTypes } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup } from 'react-bootstrap'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import { container, formLabel, titleContainer, formContainer } from './styles.css'
import { rightIcon } from 'containers/LeftPane/styles.css'

LeftPaneProperty.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
}

export default function LeftPaneProperty (props) {
  return (
    <div className={container}>
      <div className={titleContainer} onClick={props.handleHeaderClick}>
        <Col sm={10}><div>{'Property'}</div></Col>
        { props.isCollapsed === true
          ? <Col sm={2}><FaAngleRight className={rightIcon}/></Col>
          : <Col sm={2}><FaAngleDown className={rightIcon}/></Col>
        }
      </div>
      { props.isCollapsed === true
        ? null
        : <div className={formContainer}>
          <Form>
            <FormGroup controlId="leftPanePurchasePrice">
              <ControlLabel>
                <span className={formLabel}>{'Purchase price'}</span>
              </ControlLabel>
              <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </FormGroup>

            <FormGroup controlId="leftPaneAnalysisStartDate">
              <ControlLabel>
                <span className={formLabel}>{'Analysis start date'}</span>
              </ControlLabel>
              <FormControl type="text" />
            </FormGroup>

            <FormGroup controlId="leftPaneEndDate">
              <ControlLabel>
                <span className={formLabel}>{'End date'}</span>
              </ControlLabel>
              <FormControl type="text" />
            </FormGroup>
          </Form>
        </div>
      }
    </div>
  )
}
