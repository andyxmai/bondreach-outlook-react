import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <div>{'If you managed to get to this screen, most likely something wrong happened. Let me know what you did at andrew.x.mai@gmail.com.'}</div>
    </div>
  )
}
