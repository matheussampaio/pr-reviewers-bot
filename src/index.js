const commands = require('probot-commands')

const handlePullRequests = require('./core')

module.exports = robot => {
  robot.on(['pull_request.opened', 'pull_request.reopened'], handlePullRequests)

  commands(robot, 'review', handlePullRequests)
}
