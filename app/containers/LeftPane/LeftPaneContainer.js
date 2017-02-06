import React, {PropTypes} from 'react'
import { LeftPanePropertyContainer, LeftPaneAssumptionsContainer } from 'containers'
import { LeftPaneTextSection, LeftPaneButtonSection, LeftPaneProperty, LeftPaneAssumptions,  } from 'components'
import { container, header } from './styles.css'

const LeftPaneContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleHeaderClick () {
    console.log('Header clicked')
  },

  goToExpenses (e) {
    e.stopPropagation()
    const destination = '/expenses'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push('/expenses')
  },

  gotoRentRoll (e) {
    e.stopPropagation()
    const destination = '/rent-roll'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push('/rent-roll')
  },

  render () {
    return (
      <div className={container}>
        <div className={header}>{'Inputs'}</div>
        <LeftPaneProperty
          isCollapsed={true}
          handleHeaderClick={this.handleHeaderClick}
        />
        <LeftPaneAssumptions
          isCollapsed={true}
          handleHeaderClick={this.handleHeaderClick}
        />
        <LeftPaneTextSection title={'Expenses & Expenditures'}
          handleTextSectionHeaderClick={this.goToExpenses} />
        <LeftPaneTextSection title={'Market Leasing Assumptions & Rent Roll'}
          handleTextSectionHeaderClick={this.gotoRentRoll} />
        <LeftPaneButtonSection />
      </div>
    )
  }
})

export default LeftPaneContainer
