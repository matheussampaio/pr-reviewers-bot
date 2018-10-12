const commands = require('probot-commands')

const handlePullRequests = require('./core')

module.exports = app => {
  app.on(['pull_request.opened', 'pull_request.reopened'], handlePullRequests)

  commands(app, 'review', handlePullRequests)
}
