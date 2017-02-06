import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { Button } from 'react-bootstrap'
import { container, title, tableHeaderContainer } from './styles.css'
import { btnGreen } from 'sharedStyles/buttons.css'

export default function TenantCashflowTable (props) {
  const columns = [
    { key: 'item', name: '', width: 250, locked: true },
    { key: 'year1', name: '01/2018', width: 100 },
    { key: 'year2', name: '01/2019', width: 100 },
    { key: 'year3', name: '01/2020', width: 100 },
    { key: 'year4', name: '01/2021', width: 100 },
    { key: 'year5', name: '01/2022', width: 100 },
    { key: 'year6', name: '01/2023', width: 100 },
    { key: 'year7', name: '01/2024', width: 100 },
    { key: 'year8', name: '01/2025', width: 100 },
    { key: 'year9', name: '01/2026', width: 100 },
    { key: 'year10', name: '01/2027', width: 100 },
  ]

  const rows = [
    {id: 1, item: 'Potential Gross Revenue'},
    {id: 2, item: 'Rental Revenue', year1: 5000000, year2: 5000000, year3: 5000000, year4: 5000000, year5: 5000000, year6: 5000000, year7: 5000000},
    {id: 3, item: 'Vacancy', year1: 700000, year2: 700000, year3: 700000, year4: 700000, year5: 700000, year6: 700000, year7: 700000},
    {id: 4, item: 'Total Gross Revenue', year1: 4300000, year2: 4300000, year3: 4300000, year4: 4300000, year5: 4300000, year6: 4300000, year7: 4300000},
  ]

  const rowHeight = 35
  function getHeight () {
    return rowHeight * (rows.length + 1) + 2  // cell height + border height
  }

  function rowGetter (i) {
    return rows[i]
  }

  return (
    <div className={container}>
      <div className={tableHeaderContainer}>
        <div className={title}>
          {'Suite 400 - DoorDash'}
        </div>
        <Button className={btnGreen}>{'Export CSV'}</Button>
      </div>
      <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={rows.length}
        rowHeight={rowHeight}
        minHeight={getHeight()}
        enableCellSelect={true}
        />
      </div>
    </div>
  )
}
