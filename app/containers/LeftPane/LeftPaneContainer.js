import React from 'react'
import { LeftPanePropertyContainer, LeftPaneAssumptionsContainer } from 'containers'
import { LeftPaneTextSection, LeftPaneButtonSection } from 'components'
import { container, header } from './styles.css'

const LeftPaneContainer = React.createClass({
  render () {
    return (
      <div className={container}>
        <div className={header}>{'Inputs'}</div>
        <LeftPanePropertyContainer />
        <LeftPaneAssumptionsContainer />
        <LeftPaneTextSection title={'Expenses & Expenditures'} />
        <LeftPaneTextSection title={'Market Leasing Assumptions & Rent Roll'} />
        <LeftPaneButtonSection />
      </div>
    )
  }
})

export default LeftPaneContainer
