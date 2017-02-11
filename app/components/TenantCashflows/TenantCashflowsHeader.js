import React, { PropTypes } from 'react'
import { Form, FormGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap'
import { headerContainer, title } from './styles.css'
import { btnGray, btnGrayInverse } from 'sharedStyles/buttons.css'
import Select from 'react-select'

const tenantOptions =[
  { value: 'all', label: 'All tenants' },
  { value: 'doordash', label: 'DoorDash' },
  { value: 'opendoor', label: 'OpenDoor' },
]

export default function TenantCashflowsHeader (props) {
  return (
    <div className={headerContainer}>
      <div style={{width: '300px'}}>
        <Select
            name="tenant"
            value={props.selectedTenant}
            options={tenantOptions}
            onChange={props.handleSelectedTenantChanged}
            clearable={false}
            searchable={false}
        />
      </div>
      <div>
        <ButtonGroup>
          <Button bsSize="small" className={btnGrayInverse}>Nominal</Button>
          <Button bsSize="small" className={btnGray}>Per Sqft</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
