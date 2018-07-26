const _ = require('lodash')

const Config = require('./config')
const Database = require('./database')
const Team = require('./team')

module.exports = async function handlePullRequests (context) {
  const config = new Config(context)

  await config.load()

  if (config.getMinReviewersPerPR() === 0) {
    return context.log.info('minimum reviewers per request equal to 0, skipping...')
  }

  if (config.getTeam().length === 0) {
    return context.log.info('empty team, skipping...')
  }

  const pr = await getPRInformation(context)

  const hasMinimumNumberOfReviewers = pr.reviewers.length >= config.getMinReviewersPerPR()

  if (hasMinimumNumberOfReviewers) {
    return context.log.info('this PR already contains enough reviewers, skipping...')
  }

  return findNextReviewersAndAddToPR({ config, context, pr })
}

async function getPRInformation (context) {
  const [pullRequest, pullRequestReviews] = await Promise.all([
    context.github.pullRequests.get(context.issue()),
    context.github.pullRequests.getReviews(context.issue())
  ])

  const usersThatAlreadyReviewed = _.get(pullRequestReviews, 'data', [])
  const waitingReviewFromUsers = _.get(pullRequest, 'data.requested_reviewers', [])

  return {
    owner: _.get(pullRequest, 'data.user.login'),
    repository: `${context.repo().owner}/${context.repo().repo}`,
    reviewers: waitingReviewFromUsers.concat(usersThatAlreadyReviewed)
  }
}

async function findNextReviewersAndAddToPR ({ config, context, pr }) {
  const db = new Database(pr.repository)

  await validateTeamConfiguration({ db, config })

  const nextReviewers = await getNextReviewers({ db, config, context, pr })

  if (!nextReviewers.length) {
    return context.log.info(`can't find available reviewer...`)
  }

  return Promise.all([
    addReviewersToPR(context, nextReviewers),
    createCommentBodyAndPost(context, nextReviewers)
  ])
}

async function validateTeamConfiguration ({ db, config }) {
  const currentTeamHash = await db.getTeamHash()
  const configTeamHash = config.getTeamHash()

  if (currentTeamHash !== configTeamHash) {
    return Promise.all([
      db.clearQueue(),
      db.setTeamHash(configTeamHash)
    ])
  }
}

async function getNextReviewers ({ db, config, context, pr }) {
  const team = new Team({
    queue: await db.getQueue(),
    team: config.getTeam(),
    numberOfReviewers: config.getMinReviewersPerPR() - pr.reviewers.length,
    shuffleTeam: config.getShuffleTeam()
  })

  const nextReviewers = team.getNextReviewers({
    filterUsers: pr.reviewers.map(user => user.login).concat(pr.owner)
  })

  context.log.info({ nextReviewers }, 'selected reviewers')

  if (!process.env.DRY_RUN) {
    await db.setQueue(team.getQueue())
  }

  return nextReviewers
}

function createCommentBodyAndPost (context, users) {
  const body = createCommmentBody(users)

  context.log.info({ body }, 'adding comment to the pull request')

  return addComment(context, body)
}

function createCommmentBody (nextReviewers) {
  if (nextReviewers.length === 0) {
    throw new Error('Cant format empty reviewers')
  }

  const reviewersWithAt = nextReviewers.map(user => `@${user}`)

  const mentions = reviewersWithAt.length === 1 ? reviewersWithAt[0] : formatMultipleUsers(reviewersWithAt)

  return `Hi, I added ${mentions} to review this pull request.`
}

function formatMultipleUsers (users) {
  const firstUsers = users.slice(0, users.length - 1)
  const lastUser = users[users.length - 1]

  return firstUsers.join(', ') + ' and ' + lastUser
}

function addComment (context, body) {
  const options = context.issue({ body })

  if (process.env.DRY_RUN) {
    return Promise.resolve()
  }

  return context.github.issues.createComment(options)
}

function addReviewersToPR (context, users) {
  const options = context.issue({
    reviewers: users
  })

  if (process.env.DRY_RUN) {
    return Promise.resolve()
  }

  return context.github.pullRequests.createReviewRequest(options)
}
