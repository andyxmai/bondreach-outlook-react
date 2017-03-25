import numeral from 'numeral'
import { maxInvestmentSizePreference } from 'config/constants'

export function parseDisplayName (displayName) {
  var firstName = ''
  var lastName = ''

  const tokens = displayName.split(" ");
  if (tokens.length === 1) {
    firstName = tokens[0]
  } else if (tokens.length === 2) {
    firstName = tokens[0]
    lastName = tokens[1]
  } else {
    lastName = tokens.pop
    firstName = tokens.join(' ')
  }

  return { firstName, lastName }
}

export function formatToSelectOptions (options) {
  var formatedOptions = []
  for (let option of options) {
    const selectionOption = {
      id: option['id'],
      name: option['name'],
      key: option['id'],
      text: option['name'],
    }
    formatedOptions.push(selectionOption)
  }

  return formatedOptions
}

export function formatToMultiSelectOptions (options) {
  var formatedOptions = []
  for (let option of options) {
    const selectionOption = {
      value: option['id'],
      label: option['name'],
    }
    formatedOptions.push(selectionOption)
  }

  return formatedOptions
}

export function formatFromSelectionOptions (options) {
  var formatedOptions = []
  for (let option of options) {
    const selectionOption = {
      id: option['value'],
      name: option['label'],
    }
    formatedOptions.push(selectionOption)
  }

  return formatedOptions
}

export function formatInvestmentSizePreference (size, isMax) {
  if (isMax) {
    if (size === maxInvestmentSizePreference) {
      return 'no max'
    }
  } else if (!isMax) {
    if (size === 0) {
      return 'no min'
    }
  }

  const sizeInMillions = size / 1000000

  return `$${sizeInMillions}mm`
}

export function formatInvestmentSizePreferences (min, max) {
  const minStr = formatInvestmentSizePreference(min, false)
  const maxStr = formatInvestmentSizePreference(max, true)
  return `${minStr} - ${maxStr}`
}

export function formatInvestmentReturnPreferences (min, max) {
  return `${min}% - ${max}%`
}

export function formatAppointmentFields (beginDateObj, contactObj) {
  var end = beginDateObj
  end.setHours(beginDateObj.getHours() + 1)
  const subject = `Follow up - ${contactObj.firstName} ${contactObj.lastName}`
  var body = 'Added through BondReach'
  if (contactObj.phone !== '') {
    body = `Phone: ${contactObj.phone}\n` + body
  }
  if (contactObj.email !== '') {
    body = `Email: ${contactObj.email}\n` + body
  }
  if (contactObj.company !== '') {
    body = `Company: ${contactObj.company}\n` + body
  }

  return {
    subject,
    body,
    start: beginDateObj.toISOString(),
    end: end.toISOString(),
  }
}

export function formatOutlookContactNotes (contact) {
  var notes = 'Investment Preferences \n'
  const minSize = formatInvestmentSizePreference(contact.minimumInvestmentSize, false)
  const maxSize = formatInvestmentSizePreference(contact.maximumInvestmentSize, true)

  if (contact.investmentTypePreferences.length) {
    notes += 'Product types: '
    contact.investmentTypePreferences.forEach((investmentTypePreference) => {
      notes += `${investmentTypePreference.name} `
    })
  }
  notes += '\n'
  notes += `Size: ${minSize} - ${maxSize}\n`
  notes += `Return: ${contact.minimumIrrReturn}% - ${contact.maximumIrrReturn}%\n`
  if (contact.regionPreferences.length) {
    notes += 'Regions: '
    contact.regionPreferences.forEach((regionPreference) => {
      notes += `${regionPreference.name} `
    })
  }
  notes += '\n'

  if (contact.notes != '') {
    notes += `\nNotes:\n${contact.notes}\n`
  }

  return notes
}
