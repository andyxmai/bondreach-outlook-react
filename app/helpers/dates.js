import moment from 'moment'

export function ISOStringToDate (ISOString) {
  return moment(ISOString).format('MM/DD/YYYY')
}

export function ISOStringToShortDate (ISOString) {
  return moment(ISOString).format('MM/DD')
}

export function humanizedTime (ISOString) {
  if (moment().diff(ISOString, 'days') > 7) {
    return moment(ISOString).format('MM/DD/YYYY')
  }

  return moment(ISOString).fromNow()
}

export function formatJSDateToPyDate (date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
