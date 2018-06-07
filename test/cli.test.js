const test = require('ava')

const CLI = require('../src/cli')

const commands = ['reviewers', '--number', '2', '--filter', 'p1', 'p2', 'p3']

test('the command should be reviewers', t => {
  const cli = new CLI(commands)

  t.is(cli.argv.command, 'reviewers')
})

test('number should be 2', t => {
  const cli = new CLI(commands)

  t.is(cli.argv.number, 2)
})

test('default config should be local .github/pr-reviewers-bot.yml', t => {
  const cli = new CLI(commands)

  t.is(cli.argv.config, './.github/pr-reviewers-bot.yml')
})

test('filter should be array', t => {
  const cli = new CLI(commands)

  t.deepEqual(cli.argv.filter, ['p1', 'p2', 'p3'])
})
