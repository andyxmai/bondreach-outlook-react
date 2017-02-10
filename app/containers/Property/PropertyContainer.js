import React from 'react'
import { Property } from 'components'

const PropertyContainer = React.createClass({
  getInitialState () {
    return {
      name: 'Millenium Business Center',
      streetAddress: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      type: 'office',
      size: 2000,
      price: 1000000,
      analysisStartDate: '01/2017',
      reportStartDate: '01/2017',
      endDate: '01/2021',
      inflation: 2,
      rentGrowth: 3,
      vacancyRate: 3,
    }
  },

  render () {
    return (
      <Property
        {...this.state}
       />
    )
  }
})

export default PropertyContainer
