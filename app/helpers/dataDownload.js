import json2csv from 'json2csv'
import { maxInvestmentSizePreference } from 'config/constants'

function getRegionPreferences (regionPreferences) {
  var results = []
  for (var i = 0; i < regionPreferences.length; i++) {
    const regionPreference = regionPreferences[i]
    results.push(regionPreference.name)
  }

  return results
}

function getInvestmentTypePreferences (investmentTypePreferences) {
  var results = []
  for (var i = 0; i < investmentTypePreferences.length; i++) {
    const investmentTypePreference = investmentTypePreferences[i]
    results.push(investmentTypePreference.name)
  }

  return results
}

export function cleanFilteredContactsExportData (filteredContacts) {
  var result = []

  for (var i = 0; i < filteredContacts.length; i++) {
    const row = filteredContacts[i]
    const cleanRow = {
      'First Name': row.firstName,
      'Last Name': row.lastName,
      'Email': row.email,
      'Phone': row.phone,
      'Company': row.company,
      'Investment Type Preferences': getInvestmentTypePreferences(row.investmentTypePreferences),
      'Minimum Investment Size': row.minimumInvestmentSize === 0 ? 'no minimum' : row.minimumInvestmentSize,
      'Maximum Investment Size': row.maximumInvestmentSize === maxInvestmentSizePreference ? 'no maximum' : row.maximumInvestmentSize,
      'Region Preferences': getRegionPreferences(row.regionPreferences),
      'Notes': row.notes,
    }

    result.push(cleanRow)
  }

  return result
}

export function downloadJsonToCsv (data) {
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += json2csv(data)
  const encodedUri = encodeURI(csvContent)
  window.open(encodedUri)
}
