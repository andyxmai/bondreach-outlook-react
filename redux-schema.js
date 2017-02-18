{
  property: {
    isFetching,
    name,
    streetAddress,
    city,
    state,
    type,
    size,
    price
  },

  report: {
    isFetching,
    versionName,
    createdAt,
    analysisStartDate,
    reportStartDate,
    endDate,
    assumptions: {
      inflationGrowth,
      rentGrowth,
      vacancyRate,
    },
    property: {
      name,
      streetAddress,
      city,
      state,
      type,
      size,
      price
    }
  },
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
