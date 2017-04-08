import { batchRequests, fetchCustomersWithParams, updateCustomer } from 'helpers/api'
import { formatTeamInviteCandidatesToOptions } from 'helpers/reactSelect'
import { parseEmail } from 'helpers/utils'
import * as analytics from 'helpers/analytics'

const FETCHING_TEAM_INVITE_CANDIDATES = 'FETCHING_TEAM_INVITE_CANDIDATES'
const FETCHING_TEAM_INVITE_CANDIDATES_SUCCESS = 'FETCHING_TEAM_INVITE_CANDIDATES_SUCCESS'
const FETCHING_TEAM_INVITE_CANDIDATES_FAILURE = 'FETCHING_TEAM_INVITE_CANDIDATES_FAILURE'
const SHOW_TEAM_INVITES_DIALOG = 'SHOW_TEAM_INVITES_DIALOG'
const HIDE_TEAM_INVITES_DIALOG = 'HIDE_TEAM_INVITES_DIALOG'
const CHANGE_TEAM_INVITES = 'CHANGE_TEAM_INVITES'
const ADD_TEAM_MEMBERS_SUCCESS = 'ADD_TEAM_MEMBERS_SUCCESS'
const ADD_TEAM_MEMBERS_FAILURE = 'ADD_TEAM_MEMBERS_FAILURE'

function fetchingInviteCandidates () {
  return {
    type: FETCHING_TEAM_INVITE_CANDIDATES,
  }
}

function showInvitesDialog () {
  return {
    type: SHOW_TEAM_INVITES_DIALOG,
  }
}

export function hideInvitesDialog () {
  return {
    type: HIDE_TEAM_INVITES_DIALOG,
  }
}

export function handleInvitesChanged (invitesSelected) {
  var invites = []
  for (let selection of invitesSelected) {
    const inviteId = selection.value
    invites.push(inviteId)
  }

  return {
    type: CHANGE_TEAM_INVITES,
    invites,
  }
}

function fetchingInviteCandidatesSuccess (inviteCandidatesOptions) {
  return {
    type: FETCHING_TEAM_INVITE_CANDIDATES_SUCCESS,
    inviteCandidatesOptions,
  }
}

function fetchingInviteCandidatesFailure (inviteError) {
  return {
    type: FETCHING_TEAM_INVITE_CANDIDATES_FAILURE,
    inviteError,
  }
}

// remove candidates who are already on the team.
// Should probably do this on the backend
function filterCandidates (candidates, currentTeamId) {
  var filteredCandidates = []
  for (let candidate of candidates) {
    if (!candidate.team || candidate.team.id !== currentTeamId) {
      filteredCandidates.push(candidate)
    }
  }
  return filteredCandidates
}

export function fetchAndHandleAddMembers () {
  return function (dispatch, getState) {
    dispatch(showInvitesDialog())
    dispatch(fetchingInviteCandidates())
    const userEmail = getState().user.email
    const { _, domain } = parseEmail(userEmail)
    const params = { search: domain }
    fetchCustomersWithParams(params)
      .then((res) => {
        const currentTeamId = getState().user.team.id
        const filteredCandidates = filterCandidates(res.data.results, currentTeamId)
        const inviteCandidatesOptions = formatTeamInviteCandidatesToOptions(filteredCandidates)
        dispatch(fetchingInviteCandidatesSuccess(inviteCandidatesOptions))
      })
      .catch((err) => {
        console.warn(err)
        dispatch(fetchingInviteCandidatesFailure('Failed to get team member candidates'))
      })
  }
}

function addTeamMembersSuccess (inviteSuccessMsg) {
  return {
    type: ADD_TEAM_MEMBERS_SUCCESS,
    inviteSuccessMsg,
  }
}

function addTeamMembersFailure (inviteError) {
  return {
    type: ADD_TEAM_MEMBERS_FAILURE,
    inviteError,
  }
}

export function handleSubmitNewMembers() {
  return function (dispatch, getState) {
    const invites = getState().teamInvites.invites
    if (invites.length === 0) {
      dispatch(addTeamMembersFailure('No members selected'))
      return
    }
    amplitude.getInstance().logEvent(analytics.BR_OL_PROFILE_ADD_MEMBERS_CLICKED)
    const currentTeam = getState().user.team
    var updateCustomerRequests = []
    for (var i = 0; i < invites.length; i++) {
      const customer = {
        id: invites[i],
        team: currentTeam,
      }
      updateCustomerRequests.push(updateCustomer(customer))
    }
    batchRequests(updateCustomerRequests)
      .then((responses) => {
        dispatch(addTeamMembersSuccess('Members added'))
      }).catch((error) => {
        console.warn(error)
        dispatch(addTeamMembersFailure('Failed to add team members'))
      })
  }
}

const initialState = {
  isFetchingInviteCandidates: false,
  isInvitesDialogOpened: false,
  inviteError: '',
  inviteSuccessMsg: '',
  invites: [],
  inviteCandidatesOptions: [],
}

export default function teamInvites (state = initialState, action) {
  switch (action.type) {
    case FETCHING_TEAM_INVITE_CANDIDATES:
      return {
        ...state,
        isFetchingInviteCandidates: true,
      }
    case FETCHING_TEAM_INVITE_CANDIDATES_SUCCESS:
      return {
        ...state,
        isFetchingInviteCandidates: false,
        inviteCandidatesOptions: action.inviteCandidatesOptions,
        inviteError: '',
      }
    case FETCHING_TEAM_INVITE_CANDIDATES_FAILURE:
      return {
        ...state,
        isFetchingInviteCandidates: false,
        inviteError: action.inviteError,
        inviteSuccessMsg: '',
      }
    case SHOW_TEAM_INVITES_DIALOG:
      return {
        ...state,
        isInvitesDialogOpened: true,
      }
    case HIDE_TEAM_INVITES_DIALOG:
      return {
        ...state,
        isInvitesDialogOpened: false,
        inviteError: '',
        inviteSuccessMsg: '',
      }
    case CHANGE_TEAM_INVITES:
      return {
        ...state,
        invites: action.invites,
      }
    case ADD_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        inviteSuccessMsg: action.inviteSuccessMsg,
        inviteError: '',
        invites: [],
      }
    case ADD_TEAM_MEMBERS_FAILURE:
      return {
        ...state,
        inviteError: action.inviteError,
        inviteSuccessMsg: '',
      }
    default:
      return state
  }
}
