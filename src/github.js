const github = require('octonode')

class Github {
  constructor({ GH_TOKEN, GH_REPOSITORY }) {
    this.GH_TOKEN = GH_TOKEN
    this.GH_REPOSITORY = GH_REPOSITORY

    this.client = github.client(GH_TOKEN)
  }

  addPRReviewRequest(users) {
    return new Promise((resolve, reject) => {
      const pr = this.client.pr(GH_REPOSITORY, 2)

      pr.createReviewRequests(['moisesflores22'], (error, ...rest) => {
        if (error) {
          return reject(error)
        }

        return resolve(rest)
      })
    })
  }
}
