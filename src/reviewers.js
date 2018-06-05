const _ = require('lodash')

// Set.prototype.pop = function() {
//   if (this.size) {
//     const value = this.values().next().value;

//     this.delete(value);

//     return value
//   }
// }

class Reviewers {
  constructor({ team = [], reviewers, numberOfReviewers = 1 } = {}) {
    this.team = _.clone(team)
    this.reviewers = _.clone(reviewers || this.team)
    this.numberOfReviewers = Math.min(numberOfReviewers, this.team.length)
  }

  getReviewers({ filterUsers = [] } = {}) {
    const selectedReviewers = []

    while (selectedReviewers.length < this.numberOfReviewers) {
      if (this.reviewers.length === 0) {
        this.reviewers = _.clone(this.team)
      }

      selectedReviewers.push(this.getReviewer({ filterUsers }))
    }

    return selectedReviewers
  }

  getReviewer({ filterUsers = [] } = {}) {
    const reviewerIndex = this.reviewers.findIndex(user => filterUsers.indexOf(user) === -1)

    if (reviewerIndex === -1) {

    }

    const reviewers = this.reviewers.splice(reviewerIndex, 1)

    if (reviewers.length) {
      return reviewers[0]
    }

    throw new Error(`can't find a reviewer`)
  }
}

module.exports = Reviewers
