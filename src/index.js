const _ = require('lodash')

const Config = require('./config')
const Team = require('./team')
const Database = require('./database')

const PULL_REQUEST_EVENTS = [
  'pull_request.opened',
  'pull_request.edited'
]

module.exports = robot => {
  robot.on(PULL_REQUEST_EVENTS, async context => {
    context.log('prEvents', { event: context.event, action: context.payload.action })

    const config = new Config(context)
    const pullRequest = await context.github.pullRequests.get(context.issue())
    const requestedReviewers = _.get(pullRequest, 'data.requested_reviewers', [])
    const owner = _.get(pullRequest, 'data.user.login')
    const repositoryNamespace = `${context.repo().owner}/${context.repo().repo}`

    if (requestedReviewers.length < await config.getMinTeviewersPerPR()) {
      const db = new Database(repositoryNamespace)

      const team = new Team({
        queue: db.getQueue(),
        team: await config.getTeam(),
        numberOfReviewers: await config.getMinTeviewersPerPR(),
        shuffleTeam: config.getShuffleTeam()
      })

      const nextReviewers = team.getNextReviewers({
        filterUsers: requestedReviewers.map(user => user.login).concat(owner)
      })

      db.setQueue(team.getQueue())

      await addReviewersToPR(context, nextReviewers)

      const body = createBody(nextReviewers)

      await addComment(context, body)
    }
  })
}

function addReviewersToPR (context, users) {
  const options = context.issue({
    reviewers: users
  })

  context.log('add reviewers', options)

  if (process.env.DRY_RUN) {
    return Promise.resolve()
  }

  return context.github.pullRequests.createReviewRequest(options)
}

function addComment (context, body) {
  const options = context.issue({ body })

  context.log('add comment', options)

  if (process.env.DRY_RUN) {
    return Promise.resolve()
  }

  return context.github.issues.createComment(options)
}

function createBody (reviewers) {
  const reviewersWithAt = reviewers.map(user => `@${user}`)

  if (reviewersWithAt.length >= 1) {
    const lastIndex = reviewersWithAt.length - 1

    reviewersWithAt[lastIndex] = `and ${reviewersWithAt[lastIndex]}`
  }

  const mentions = reviewersWithAt.join(', ')

  return `Hi, I added ${mentions} to review this pull request.`
}
