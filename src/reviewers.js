function getNextReviewers({ lastReviewer, team = [], numberOfReviewers = 1 } = {}) {
  if (team.length === 0) {
    return null
  }

  if (lastReviewer == null) {
    return team.slice(0, numberOfReviewers)
  }

  const lastReviewerIndex = team.indexOf(lastReviewer)

  if (lastReviewerIndex === -1) {
    return team.slice(0, numberOfReviewers)
  }

  const nextReviewerIndex = (lastReviewerIndex + 1) % team.length

  return team.slice(nextReviewerIndex, nextReviewerIndex + numberOfReviewers)
}

module.exports = { getNextReviewers }

