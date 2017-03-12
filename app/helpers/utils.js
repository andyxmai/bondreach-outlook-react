import { usersDucksExpirationLength, userExpirationLength, repliesExpirationLength } from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatDuck (text, {name, avatar, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

export function staleReplies (timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength
}

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    timestamp: Date.now(),
    avatar,
  }
}

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
