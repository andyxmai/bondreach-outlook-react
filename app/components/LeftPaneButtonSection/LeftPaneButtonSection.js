import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { container } from './styles.css'
import { btnGreen } from 'sharedStyles/buttons.css'

export default function LeftPaneButtonSection (props) {
  return (
    <div className={container}>
      <Button bsSize="large" block className={btnGreen}>{'Analyze'}</Button>
    </div>
  )
}
