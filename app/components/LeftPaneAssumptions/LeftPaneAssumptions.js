import React, { PropTypes } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, InputGroup } from 'react-bootstrap'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import { container, formLabel, titleContainer, formContainer } from './styles.css'
import { rightIcon } from 'containers/LeftPane/styles.css'

LeftPaneAssumptions.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
}

export default function LeftPaneAssumptions (props) {
  return (
    <div className={container}>
      <div className={titleContainer} onClick={props.handleHeaderClick}>
        <Col sm={10}><div>{'Assumptions'}</div></Col>
        { props.isCollapsed === true
          ? <Col sm={2}><FaAngleRight className={rightIcon}/></Col>
          : <Col sm={2}><FaAngleDown className={rightIcon}/></Col>
        }
      </div>
      { props.isCollapsed === true
        ? null
        : <div className={formContainer}>
          <Form>
            <FormGroup controlId="leftPaneInflation">
              <ControlLabel>
                <span className={formLabel}>{'Inflation growth'}</span>
              </ControlLabel>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>%</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId="leftPaneInflation">
              <ControlLabel>
                <span className={formLabel}>{'Rent growth'}</span>
              </ControlLabel>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>%</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId="leftPaneInflation">
              <ControlLabel>
                <span className={formLabel}>{'Vacancy growth'}</span>
              </ControlLabel>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>%</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Form>
        </div>
      }
    </div>
  )
}
