import React, { PropTypes } from 'react'
import { Modal } from 'react-modal'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

export default function NewExpenseModal (props) {
  function closeModal () {
    console.log('modal closed')
  }

  return (
    <div>
      <Modal style={modalStyles} isOpen={true} onRequestClose={closeModal} contentLabel="Modal">
        <div>
          <span>{'New Expenses'}</span>
          <span onClick={closeModal}>{'X'}</span>
        </div>
      </Modal>
    </div>
  )
}
