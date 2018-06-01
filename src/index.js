const github = require('octonode')
const dotenv = require('dotenv')
const nconf = require('nconf')
const fs = require('fs-extra')

main()

function main() {
  initEnvironmentVariables()

  const { GH_TOKEN, GH_REPOSITORY } = process.env

  const client = github.client(GH_TOKEN)
  const pr = client.pr(GH_REPOSITORY, 2)

  // pr.createReviewRequests(['moisesflores22'], (...args) => console.log(...args))
}


function initEnvironmentVariables() {
  dotenv.config()

  nconf.argv()
    .env()
    .required(['GH_TOKEN', 'GH_REPOSITORY'])
}

