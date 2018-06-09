#! /usr/bin/env node

const debug = require('debug')('pr-reviewers-bot')

const CLI = require('./cli')
const Config = require('./config')
const Reviewers = require('./reviewers')

main()
  .catch(error => {
    console.error('ERROR:', error.message)
    process.exit(1)
  })

async function main () {
  const cli = new CLI()

  debug('cli argv', cli.argv)

  const config = new Config(cli.argv.config)

  await config.read()

  debug('config data', config.data)

  const options = {
    team: config.data.configuration.team,
    numberOfReviewers: cli.argv.number || config.data.configuration.number_of_reviewers,
    shuffleTeams: true
  }

  debug('reviewers options', options)

  const reviewers = new Reviewers(options)

  console.log(reviewers.getReviewers({ filterUsers: cli.argv.filter }))
}
