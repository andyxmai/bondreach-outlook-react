export function formatTeamInviteCandidatesToOptions (candidates) {
  var candidateOptions = []
  for (let candidate of candidates) {
    const label = `${candidate['user']['firstName']} ${candidate['user']['lastName']}\n(${candidate['user']['email']})`
    const selectionOption = {
      value: candidate['id'],
      label,
    }
    candidateOptions.push(selectionOption)
  }

  return candidateOptions
}
