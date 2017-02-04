import React, { PropTypes } from 'react'
import FaAngleRight from 'react-icons/lib/fa/angle-right'
import { Col } from 'react-bootstrap'
import { container, title } from './styles.css'
import { rightIcon } from 'containers/LeftPane/styles.css'

export default function LeftPaneTextSection (props) {
  return (
    <div className={container}>
      <Col sm={10}><div className={title}>{props.title}</div></Col>
      <Col sm={2}><FaAngleRight className={rightIcon} /></Col>
    </div>
  )
}
