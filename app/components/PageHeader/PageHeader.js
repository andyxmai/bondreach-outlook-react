import React, { PropTypes } from 'react'
import { container, pageTitle, select } from './styles.css'
import { selectField } from 'sharedStyles/styles.css'
import Select from 'react-select'

const versionOptions = [
  { value: 'original', label: 'Version - Original' },
]

export default function PageHeader (props) {
  return (
    <div className={container}>
      <div className={pageTitle}>{props.title}</div>
      <div className={select}>
        <Select
            name="analysis-version"
            value={props.currentVersion}
            options={versionOptions}
            onChange={props.handleVersionChanged}
            clearable={false}
            searchable={false}
            className={selectField}
        />
      </div>
    </div>
  )
}
