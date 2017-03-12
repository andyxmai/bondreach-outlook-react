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

export function formatJSDateToPyDate (date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
