import React, { PropTypes } from 'react'
import { centerContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({error, isFetching, onAuth}) {
  return (
    <div className={centerContainer}>
      <h1 className={largeHeader}>Authenticate</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
