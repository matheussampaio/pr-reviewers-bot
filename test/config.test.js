const test = require('ava')
const sinon = require('sinon')

const Config = require('../src/config')
const context = {
  config: sinon.fake.returns({})
}

test('minimum reviewers default should be 0', async t => {
  const config = new Config(context)

  await config.load()

  t.is(config.getMinReviewersPerPR(), 0)
})

test('default team should be an empty array', async t => {
  const config = new Config(context)

  await config.load()

  t.deepEqual(config.getTeam(), [])
})

test('default shuffle team configuration should be true', async t => {
  const config = new Config(context)

  await config.load()

  t.true(config.getShuffleTeam())
})

test('minimum reviewers default should be 0', async t => {
  const context = {
    config: sinon.fake.returns({
      min_reviewers_per_pr: 10
    })
  }

  const config = new Config(context)

  await config.load()

  t.is(config.getMinReviewersPerPR(), 10)
})

test('default team should be an empty array', async t => {
  const context = {
    config: sinon.fake.returns({
      team: ['matheussampaio']
    })
  }

  const config = new Config(context)

  await config.load()

  t.deepEqual(config.getTeam(), ['matheussampaio'])
})

test('default shuffle team configuration should be true', async t => {
  const context = {
    config: sinon.fake.returns({
      shuffle_team: false
    })
  }

  const config = new Config(context)

  await config.load()

  t.false(config.getShuffleTeam())
})
