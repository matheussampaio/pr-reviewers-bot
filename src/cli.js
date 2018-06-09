const yargs = require('yargs')

const { version } = require('../package.json')

class CLI {
  constructor (parameters) {
    this.yargs = parameters == null ? yargs : yargs(parameters)

    this.init()
  }

  init () {
    this.argv = this.yargs.usage('$0 <command> <params> [options]')
      .command('reviewers', 'Suggest reviewers to the PR', {
        n: {
          alias: 'number',
          demand: false,
          description: 'Number of reviewers to suggest',
          requiresArgs: true,
          type: 'number'
        },
        c: {
          alias: 'config',
          demand: false,
          description: 'Config path',
          requiresArgs: true,
          type: 'string',
          default: './.github/pr-reviewers-bot.yml'
        },
        f: {
          alias: 'filter',
          demand: false,
          description: 'Filter users',
          requiresArgs: true,
          type: 'array'
        }
      })
      .demandCommand(1)
      .version(version)
      .help()
      .argv

    this.argv.command = this.argv._[0]
  }
}

module.exports = CLI
