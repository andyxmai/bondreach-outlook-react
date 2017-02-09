import React, {PropTypes} from 'react'
import { LeftPanePropertyContainer, LeftPaneAssumptionsContainer } from 'containers'
import { LeftPaneTextSection, LeftPaneButtonSection, LeftPaneProperty, LeftPaneAssumptions,  } from 'components'
import { Button } from 'react-bootstrap'
import { container, header, buttons, bottomButtons } from './styles.css'
import { btnGreen, btnLightGray, btnRedInverse } from 'sharedStyles/buttons.css'

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

  goToRentRoll (e) {
    e.stopPropagation()
    const destination = '/rent-roll'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push('/rent-roll')
  },

  render () {
    return (
      <div className={container}>
        <div>
          <div className={header}>{'Inputs'}</div>
          <LeftPaneProperty
            isCollapsed={true}
            handleHeaderClick={this.handleHeaderClick}
          />
{/*          <LeftPaneAssumptions
            isCollapsed={false}
            handleHeaderClick={this.handleHeaderClick}
          />
*/}
          <LeftPaneTextSection title={'Expenses & Expenditures'}
            handleTextSectionHeaderClick={this.goToExpenses} />
          <LeftPaneTextSection title={'Market Leasing Assumptions & Rent Roll'}
            handleTextSectionHeaderClick={this.goToRentRoll} />
          <div className={buttons}>
            <Button bsSize="large" block className={btnGreen}>{'See Cashflows'}</Button>
          </div>
        </div>
        <div className={bottomButtons}>
          <Button bsSize="large" block className={btnRedInverse}>{'Save this version'}</Button>
          <Button bsSize="large" block className={btnLightGray}>{'Select Version'}</Button>
        </div>
      </div>
    )
  }
})

export default LeftPaneContainer
