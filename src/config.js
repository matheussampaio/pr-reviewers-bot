const _ = require('lodash')

const CONFIG_FILEPATH = process.env.CONFIGURATION_FILENAME || 'pr-reviewers-bot.yml'

class Config {
  constructor (context) {
    this.context = context
    this.config = null
  }

  async get (path, defaults) {
    if (this.config == null) {
      this.config = await this.context.config(CONFIG_FILEPATH, {
        min_reviewers_per_pr: 0,
        reviewers: []
      })
    }

    return _.get(this.config, path, defaults)
  }

  getMinTeviewersPerPR () {
    return this.get('min_reviewers_per_pr', 0)
  }

  getTeam () {
    return this.get('reviewers', [])
  }

  getShuffleTeam () {
    return this.get('shuffle_team', false)
  }
}

module.exports = Config
