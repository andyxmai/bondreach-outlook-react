import React, { PropTypes } from 'react'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import { Col } from 'react-bootstrap'
import { container, title } from './styles.css'
import { rightIcon } from 'containers/LeftPane/styles.css'

LeftPaneTextSection.propTypes = {
  handleTextSectionHeaderClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default function LeftPaneTextSection (props) {
  return (
    <div className={container} onClick={props.handleTextSectionHeaderClick}>
      { props.isActive
        ? <b>
            <Col sm={10}><div className={title}>{props.title}</div></Col>
            <Col sm={2}><FaAngleRight className={rightIcon} /></Col>
          </b>
        : <div>
            <Col sm={10}><div className={title}>{props.title}</div></Col>
            <Col sm={2}><FaAngleRight className={rightIcon} /></Col>
          </div>
      }
    </div>
  )
}
