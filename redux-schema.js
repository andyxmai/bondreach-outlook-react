{
  user: {
    isAuthed,
    isFetching,
    error,
    authedId,
    info: {
      firstName,
      lastName,
      uid,
    },
  },
  contact: {
    isFetching,
    error,
    contactId,
    firstName,
    lastName,
    email,
    phone,
    company,
    investmentPreferences: {
      typeIds: [typeId],
      minSize,
      maxSize,
      regionIds: [regionId],
    },
  },
  addContact: {
    isLoading,
    error,
    contactId,
    firstName,
    lastName,
    email,
    phone,
    company,
    typeIds: [typeId],
    minSize,
    maxSize,
    regionIds: [regionId],
  },
  filterContacts: {
    type,
    size,
    region,
    filteredContacts: {
      [contactId]: {
        firstName,
        contactId,
        lastName,
        company,
        typeIds: [typeId],
        minSize,
        maxSize,
        regionIds: [regionId],
        }
      }
    },
  },
  regions: {
    [regionId]: {
      name
    }
  },
  investmentTypes: {
    [investmentTypeId]: {
      name
    }
  }
}

{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  modal: {
    duck,
    isOpen
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      info: {
        avatar,
        duckId,
        name,
        text,
        uid,
        timestamp
      }
    }
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId]
    }
  },
  likeCount: {
    [duckId]: 0
  },
  usersLikes: {
    [duckId]: true
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      [replyId]: {
        lastUpdated,
        name,
        comment,
        uid,
        timestamp,
        avatar
      }
    }
  },
  listeners: {
    [listernerId]: true
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    duckIdsToAdd: [duckId, duckId],
    duckIds: [duckId, duckId]
  }
}
