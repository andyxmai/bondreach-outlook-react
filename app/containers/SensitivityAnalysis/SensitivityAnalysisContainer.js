import React from 'react'
import { SensitivityAnalysis } from 'components'

const SensitivityAnalysisContainer = React.createClass({
  getInitialState () {
    return {
      toggle: false,
    }
  },

  handleSubmit () {
    this.setState({toggle: !this.state.toggle})
  },

  render () {
    return (
      <SensitivityAnalysis
        toggle={this.state.toggle}
        handleSubmit={this.handleSubmit}
      />
    )
  }
})

export default SensitivityAnalysisContainer
