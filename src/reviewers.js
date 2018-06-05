const _ = require('lodash')

const UniqueQueue = require('./unique-queue')

class Reviewers {
  constructor({ team = [], queue, numberOfReviewers = 1 } = {}) {
    this.team = _.clone(team)
    this.queue = new UniqueQueue(queue || this.team)
    this.numberOfReviewers = Math.min(numberOfReviewers, this.team.length)
  }

  getReviewers({ filterUsers = [] } = {}) {
    const skipTeamMembers = _.intersection(this.team, filterUsers)
    const eligibleUsersInTheTeam = _.difference(this.team, skipTeamMembers)

    if (eligibleUsersInTheTeam.length < this.numberOfReviewers) {
      throw new Error('not enough elible team members')
    }

    const selectedReviewers = []

    while (selectedReviewers.length < this.numberOfReviewers) {
      const reviewer = this.getReviewer({ filterUsers: skipTeamMembers.concat(selectedReviewers) })

      if (reviewer == null) {
        this.queue.addAll(this.team)
      } else {
        selectedReviewers.push(reviewer)
      }
    }

    return selectedReviewers
  }

  getReviewer({ filterUsers = [] } = {}) {
    for (let i = 0; i < this.queue.size(); i++) {
      const user = this.queue.get(i)

      if (!filterUsers.includes(user)) {
        return this.queue.delete(user)
      }
    }

    return null
  }
}

module.exports = Reviewers
