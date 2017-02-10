export const mockExplanationColumns = {
  11: [
    { key: 'name', name: 'Name' },
    { key: 'amount', name: 'Amount',},
    { key: 'fixed', name: '% Fixed',},
    { key: 'inflation', name: '% Inflation',},
  ],
  1: [
    { key: 'tenant', name: 'Tenant' },
    { key: 'size', name: 'Size',},
    { key: 'baseRent', name: 'Base Rent',},
    { key: 'currentRent', name: 'Current Rent',},
    { key: 'annualRent', name: 'Annual Rent',},
  ],
  5: [
    { key: 'tenant', name: 'Tenant' },
    { key: 'reimbursementType', name: 'Reimbursement Type' },
    { key: 'baseCost', name: 'Base Cost',},
    { key: 'currentCost', name: 'Current Cost',},
    { key: 'reimbursement', name: 'Reimbursement',},
  ],
}

export const mockExplanationRows = {
  '(11,1)': [{id: 0, name: 'Insurance', amount: '$1,000 annually', fixed: '100', inflation: '2'},],
  '(11,2)': [{id: 0, name: 'Insurance', amount: '$1,020 annually', fixed: '100', inflation: '2'},],
  '(11,3)': [{id: 0, name: 'Insurance', amount: '$1,040 annually', fixed: '100', inflation: '2'},],
  '(11,4)': [{id: 0, name: 'Insurance', amount: '$1,060 annually', fixed: '100', inflation: '2'},],
  '(11,5)': [{id: 0, name: 'Insurance', amount: '$1,082 annually', fixed: '100', inflation: '2'},],
  '(1,1)': [{id: 0, tenant: 'DoorDash', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,000/sqft/year', annualRent: '250,000'},
              {id: 1, tenant: 'OpenDoor', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,000/sqft/year', annualRent: '250,000'},],
  '(1,2)': [{id: 0, tenant: 'DoorDash', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,030/sqft/year', annualRent: '257,500'},
              {id: 1, tenant: 'OpenDoor', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,030/sqft/year', annualRent: '257,500'},],
  '(1,3)': [{id: 0, tenant: 'DoorDash', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,061/sqft/year', annualRent: '265,225'},
              {id: 1, tenant: 'OpenDoor', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,061/sqft/year', annualRent: '265,225'},],
  '(1,4)': [{id: 0, tenant: 'DoorDash', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,093/sqft/year', annualRent: '273,182'},
              {id: 1, tenant: 'OpenDoor', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,093/sqft/year', annualRent: '273,182'},],
  '(1,5)': [{id: 0, tenant: 'DoorDash', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,126/sqft/year', annualRent: '281,377'},
              {id: 1, tenant: 'OpenDoor', size: '250 sqft', baseRent: '$1,000/sqft/year', currentRent: '$1,126/sqft/year', annualRent: '281,377'},],
  '(5,1)': [{id: 0, tenant: 'DoorDash', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,000', reimbursement: '0'},
              {id: 1, tenant: 'OpenDoor', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,000', reimbursement: '0'}],
  '(5,2)': [{id: 0, tenant: 'DoorDash', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,010', reimbursement: '10'},
              {id: 1, tenant: 'OpenDoor', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,010', reimbursement: '10'}],
  '(5,3)': [{id: 0, tenant: 'DoorDash', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,020', reimbursement: '20'},
              {id: 1, tenant: 'OpenDoor', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,020', reimbursement: '20'}],
  '(5,4)': [{id: 0, tenant: 'DoorDash', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,030', reimbursement: '30'},
              {id: 1, tenant: 'OpenDoor', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,030', reimbursement: '30'}],
  '(5,5)': [{id: 0, tenant: 'DoorDash', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,041', reimbursement: '41'},
              {id: 1, tenant: 'OpenDoor', reimbursementType: 'Base Stop', baseCost: '1,000', currentCost: '1,041', reimbursement: '41'}],

}

export const mockExplanationCashflowColumns = [
  { key: 'item', name: '', width: 250, },
  { key: '01/2017', name: '01/2017' },
  { key: '01/2018', name: '01/2018' },
  { key: '01/2019', name: '01/2019' },
  { key: '01/2020', name: '01/2020' },
  { key: '01/2021', name: '01/2021' },
]

export const mockExplanationCashflowRows = {
  11: [
    {id: 1, item: 'Operating Expense', bold: true, },
    {id: 2, item: 'Insurance', '01/2017': '1,000', '01/2018': '1,020', '01/2019': '1,040', '01/2020': '1,060', '01/2021': '1,082', },
    {id: 3, item: ''},
    {id: 4, item: 'Total Expense', bold: true, '01/2017': '1,000', '01/2018': '1,020', '01/2019': '1,040', '01/2020': '1,060', '01/2021': '1,082', },
  ],
  1: [
    {id: 1, item: 'Base Rental Revenue', bold: true, },
    {id: 2, item: 'DoorDash', '01/2017': '250,000', '01/2018': '257,500', '01/2019': '265,225', '01/2020': '273,182', '01/2021': '281,377', },
    {id: 3, item: 'OpenDoor', '01/2017': '250,000', '01/2018': '257,500', '01/2019': '265,225', '01/2020': '273,182', '01/2021': '281,377', },
    {id: 4, item: ''},
    {id: 5, item: 'Total Expense', bold: true, '01/2017': '500,000', '01/2018': '515,000', '01/2019': '530,450', '01/2020': '546,364', '01/2021': '562,754', },
  ],
  5: [
    {id: 1, item: 'Expense Costs', bold: true, },
    {id: 2, item: 'Insurance', '01/2017': '1,000', '01/2018': '1,020', '01/2019': '1,040', '01/2020': '1,060', '01/2021': '1,082', },
    {id: 4, item: ''},
    {id: 1, item: 'Reimbursements', bold: true, },
    {id: 3, item: 'DoorDash', '01/2017': '', '01/2018': '10', '01/2019': '20', '01/2020': '30', '01/2021': '41', },
    {id: 3, item: 'OpenDoor', '01/2017': '', '01/2018': '10', '01/2019': '20', '01/2020': '30', '01/2021': '41', },
    {id: 4, item: ''},
    {id: 5, item: 'Total Reimbursements', '01/2017': '', '01/2018': '20', '01/2019': '40', '01/2020': '60', '01/2021': '82', },
  ]
}

export const mockExplanationCalculation = {
  11: {
    '(1,1)': {equation: 'Base year cost', formula: ''},
    '(1,2)': {equation: '1,020 = 1,000 + (0.2 * 1,000)', formula: '01/2018 cost = 01/2017 cost + (inflation rate * 01/2017 cost)'},
    '(1,3)': {equation: '1,040 = 1,020 + (0.2 * 1,020)', formula: '01/2019 cost = 01/2018 cost + (inflation rate * 01/2018 cost)'},
    '(1,4)': {equation: '1,060 = 1,040 + (0.2 * 1,040)', formula: '01/2020 cost = 01/2019 cost + (inflation rate * 01/2019 cost)'},
    '(1,5)': {equation: '1,082 = 1,060 + (0.2 * 1,060)', formula: '01/2021 cost = 01/2020 cost + (inflation rate * 01/2020 cost)'},
  },
  1: {
    '(1,1)': {equation: 'Base year rent', formula: ''},
    '(1,2)': {equation: '257,500 = 250,000 + (0.3 * 250,000)', formula: '01/2018 rent = 01/2017 rent + (rent growth * 01/2017 rent)'},
    '(1,3)': {equation: '265,225 = 257,500 + (0.3 * 257,500)', formula: '01/2019 rent = 01/2018 rent + (rent growth * 01/2018 rent)'},
    '(1,4)': {equation: '273,182 = 265,225 + (0.3 * 265,225)', formula: '01/2020 rent = 01/2019 rent + (rent growth * 01/2019 rent)'},
    '(1,5)': {equation: '281,377 = 273,182 + (0.3 * 273,182)', formula: '01/2021 rent = 01/2020 rent + (rent growth * 01/2020 rent)'},
    '(2,1)': {equation: 'Base year rent', formula: ''},
    '(2,2)': {equation: '257,500 = 250,000 + (0.3 * 250,000)', formula: '01/2018 rent = 01/2017 rent + (rent growth * 01/2017 rent)'},
    '(2,3)': {equation: '265,225 = 257,500 + (0.3 * 257,500)', formula: '01/2019 rent = 01/2018 rent + (rent growth * 01/2018 rent)'},
    '(2,4)': {equation: '273,182 = 265,225 + (0.3 * 265,225)', formula: '01/2020 rent = 01/2019 rent + (rent growth * 01/2019 rent)'},
    '(2,5)': {equation: '281,377 = 273,182 + (0.3 * 273,182)', formula: '01/2021 rent = 01/2020 rent + (rent growth * 01/2020 rent)'},
  },
  5: {
    '(1,1)': {equation: 'Base year cost', formula: ''},
    '(1,2)': {equation: '1,020 = 1,000 + (0.2 * 1,000)', formula: '01/2018 cost = 01/2017 cost + (inflation rate * 01/2017 cost)'},
    '(1,3)': {equation: '1,040 = 1,020 + (0.2 * 1,020)', formula: '01/2019 cost = 01/2018 cost + (inflation rate * 01/2018 cost)'},
    '(1,4)': {equation: '1,060 = 1,040 + (0.2 * 1,040)', formula: '01/2020 cost = 01/2019 cost + (inflation rate * 01/2019 cost)'},
    '(1,5)': {equation: '1,082 = 1,060 + (0.2 * 1,060)', formula: '01/2021 cost = 01/2020 cost + (inflation rate * 01/2020 cost)'},
    '(4,1)': {equation: 'Base year expense', formula: ''},
    '(4,2)': {equation: '10 = 1,010 - 1,000', formula: '01/2018 reimbursement = 01/2018 cost - 01/2017 cost'},
    '(4,3)': {equation: '20 = 1,020 - 1,000', formula: '01/2019 reimbursement = 01/2019 cost - 01/2017 cost'},
    '(4,4)': {equation: '30 = 1,030 - 1,000', formula: '01/2020 reimbursement = 01/2020 cost - 01/2017 cost'},
    '(4,5)': {equation: '41 = 1,041 - 1,000', formula: '01/2021 reimbursement = 01/2021 cost - 01/2017 cost'},
    '(5,1)': {equation: 'Base year expense', formula: ''},
    '(5,2)': {equation: '10 = 1,010 - 1,000', formula: '01/2018 reimbursement = 01/2018 cost - 01/2017 cost'},
    '(5,3)': {equation: '20 = 1,020 - 1,000', formula: '01/2019 reimbursement = 01/2019 cost - 01/2017 cost'},
    '(5,4)': {equation: '30 = 1,030 - 1,000', formula: '01/2020 reimbursement = 01/2020 cost - 01/2017 cost'},
    '(5,5)': {equation: '41 = 1,041 - 1,000', formula: '01/2021 reimbursement = 01/2021 cost - 01/2017 cost'},
  }
}

export const mockItemData = {
  '(11,1)': {title: 'Operating Expenses - Insurance', year:'01/2017', total:'1,000',},
  '(11,2)': {title: 'Operating Expenses - Insurance', year:'01/2018', total:'1,020',},
  '(11,3)': {title: 'Operating Expenses - Insurance', year:'01/2019', total:'1,040',},
  '(11,4)': {title: 'Operating Expenses - Insurance', year:'01/2020', total:'1,060',},
  '(11,5)': {title: 'Operating Expenses - Insurance', year:'01/2021', total:'1,082',},
  '(1,1)': {title: 'Base Rental Revenue', year:'01/2017', total:'500,000',},
  '(1,2)': {title: 'Base Rental Revenue', year:'01/2018', total:'515,000',},
  '(1,3)': {title: 'Base Rental Revenue', year:'01/2019', total:'530,450',},
  '(1,4)': {title: 'Base Rental Revenue', year:'01/2020', total:'546,364',},
  '(1,5)': {title: 'Base Rental Revenue', year:'01/2021', total:'562,754',},
  '(5,1)': {title: 'Reimbursable Expenses - Insurance', year:'01/2017', total:'0',},
  '(5,2)': {title: 'Reimbursable Expenses - Insurance', year:'01/2018', total:'20',},
  '(5,3)': {title: 'Reimbursable Expenses - Insurance', year:'01/2019', total:'40',},
  '(5,4)': {title: 'Reimbursable Expenses - Insurance', year:'01/2020', total:'60',},
  '(5,5)': {title: 'Reimbursable Expenses - Insurance', year:'01/2021', total:'82',},
}
