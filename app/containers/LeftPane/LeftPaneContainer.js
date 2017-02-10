import React, {PropTypes} from 'react'
import { LeftPanePropertyContainer, LeftPaneAssumptionsContainer } from 'containers'
import { LeftPaneTextSection, LeftPaneButtonSection, LeftPaneProperty, LeftPaneAssumptions,  } from 'components'
import { Button } from 'react-bootstrap'
import { container, header, buttons, bottomButtons, propertyInfo, title, subtitle, subtitleElem } from './styles.css'
import { btnGreen, btnLightGray, btnRedInverse } from 'sharedStyles/buttons.css'

const LeftPaneContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  goToProperty (e) {
    e.stopPropagation()
    const destination = '/property'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push(destination)
  },

  goToExpenses (e) {
    e.stopPropagation()
    const destination = '/expenses'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push(destination)
  },

  goToRentRoll (e) {
    e.stopPropagation()
    const destination = '/rent-roll'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push(destination)
  },

  goToCashflows (e) {
    e.stopPropagation()
    const destination = '/cashflows'
    if (this.context.router.location.pathname === destination) return  // so it won't push to the same path
    this.context.router.push(destination)
  },

  getPath () {
    return this.context.router.location.pathname
  },

  render () {
    return (
      <div className={container}>
        <div>
          <div className={header}>{'Inputs'}</div>
          <LeftPaneTextSection title={'Property & Assumptions'}
            handleTextSectionHeaderClick={this.goToProperty}
            isActive={this.getPath() === '/property' || this.getPath() === '/new-property'}
            />
          <LeftPaneTextSection title={'Expenses & Expenditures'}
            handleTextSectionHeaderClick={this.goToExpenses}
            isActive={this.getPath() === '/expenses'}
            />
          <LeftPaneTextSection title={'Market Leasing Assumptions & Rent Roll'}
            handleTextSectionHeaderClick={this.goToRentRoll}
            isActive={this.getPath() === '/rent-roll'}
          />
          <div className={buttons}>
            <Button bsSize="large" block className={btnGreen} onClick={this.goToCashflows}>{'See Cashflows'}</Button>
          </div>
        </div>
        <div className={bottomButtons}>
          <div className={propertyInfo}>
            <div className={title}>{'Millennium Business Center'}</div>
            <div className={subtitle}>
              <div className={subtitleElem}>{'San Francisco, CA'}</div>
              <div className={subtitleElem}>{'Office'}</div>
            </div>
          </div>
          {/*<Button bsSize="large" block className={btnRedInverse}>{'Save this version'}</Button>
          <Button bsSize="large" block className={btnLightGray}>{'Select Version'}</Button>*/}
        </div>
      </div>
    )
  }
})

export default LeftPaneContainer
