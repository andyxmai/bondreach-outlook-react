const FETCHING_INVITE_CANDIDATES = 'FETCHING_INVITE_CANDIDATES'
const FETCHING_INVITE_CANDIDATES_SUCCESS = 'FETCHING_INVITE_CANDIDATES_SUCCESS'
const FETCHING_INVITE_CANDIDATES_FAILURE = 'FETCHING_INVITE_CANDIDATES_FAILURE'
const SHOW_INVITES_DIALOG = 'SHOW_INVITES_DIALOG'
const HIDE_INVITES_DIALOG = 'SHOW_INVITES_DIALOG'

const initialState = {
  isFetching: false,
  isInvitesDialogOpened: false,
  inviteError: '',
  invites: [],
  inviteCandidates:[],
  inviteCandidatesOptions: [],
}

export default function teamInvites (state = initialState, action) {
  switch (action.type) {
    case FETCHING_INVITE_CANDIDATES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_INVITE_CANDIDATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        inviteCandidates: action.inviteCandidates,
        inviteCandidatesOptions: action.inviteCandidatesOptions,
      }
    case FETCHING_INVITE_CANDIDATES_FAILURE:
      return {
        ...state,
        isFetching: false,
        inviteError: action.inviteError,
      }
    case SHOW_INVITES_DIALOG:
      return {
        ...state,
        isInvitesDialogOpened: true,
      }
    case HIDE_INVITES_DIALOG:
      return {
        ...state,
        isInvitesDialogOpened: false,
      }
    default:
      return state
  }
}
