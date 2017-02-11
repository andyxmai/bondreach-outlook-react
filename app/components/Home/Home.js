import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { container, title } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <Panel>
        <div>{'Hey there'}</div>
        <div>
        {
          ''
        }
        </div>
      </Panel>
    </div>
  )
}
