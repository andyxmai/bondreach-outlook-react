import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <div><Link to='/add-contact'>{'Add Contact'}</Link></div>
      <div><Link to='/add-reminder/501ac39a-1e39-4b75-9897-7a747d1645f2/'>{'Add Reminder'}</Link></div>
      <div><Link to='/view-contact/501ac39a-1e39-4b75-9897-7a747d1645f2/'>{'Andy Mai'}</Link></div>
      <div><Link to='/auth'>{'Authenticate'}</Link></div>
    </div>
  )
}
