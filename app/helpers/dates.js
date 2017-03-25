export function ISOStringToDate (ISOString) {
  const date = new Date(ISOString)

  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

export function formatJSDateToPyDate (date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
