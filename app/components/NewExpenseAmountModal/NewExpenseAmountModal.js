import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { container, title, slogan } from './styles.css'

const modalStyles = {
  content: {
    width: '65%',
    margin: '0px auto',
    height: 220,
    border: '1px solid #D7DADA',
    borderRadius: 3,
    padding: 20,
  },
  overlay : {
    backgroundColor: 'rgba(89, 89, 89, 0.50)'
  },
}

export default function Home (props) {
  return (
    <Modal
      isOpen={props.amountModalOpened}
      onRequestClose={props.closeModal}
      style={modalStyles}
      contentLabel="Modal"
      >
      <h1>{'Enter amount for new expense'}</h1>
      <p>Etc.</p>
    </Modal>
  )
}
