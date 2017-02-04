import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { container, navContainer, link, links } from './styles.css'
import { ModalContainer } from 'containers'
import { Button } from 'react-bootstrap'
import { btnRed } from 'sharedStyles/buttons.css'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><Link className={link} to='/'>{'CommercialRE'}</Link></li>
      </ul>
    : null
}

function ActionLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><ModalContainer /></li>
        <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
        <li><Link className={link} to='/auth'>{'Authenticate'}</Link></li>
      </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <Link className={link} to='/'>{'CommercialRE'}</Link>
        {/* <NavLinks isAuthed={isAuthed}/>
        <ActionLinks isAuthed={isAuthed}/> */}
        <Button bsSize="large" className={btnRed}>{'New Property'}</Button>
      </nav>
    </div>
  )
}
