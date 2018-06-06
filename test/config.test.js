const test = require('ava')
const sinon = require('sinon')

const Config = require('../src/config')

const configFile = `configuration:
  number_of_reviewers: 2
  project_name: matheussampaio/github-review
  team:
    - adrian
    - andres
    - alexis
    - matheussampaio
    - moises
    - rodolfo
`

test('it should call readFile', async t => {
  const config = new Config()

  config.readFile = sinon.fake.returns(configFile)

  await config.read()

  t.true(config.readFile.calledOnce)
})

test('it should parse into JSON', async t => {
  const config = new Config()

  config.readFile = sinon.fake.returns(configFile)

  await config.read()

  t.deepEqual(config.data, {
    configuration: {
      number_of_reviewers: 2,
      project_name: 'matheussampaio/github-review',
      team: [
        'adrian',
        'andres',
        'alexis',
        'matheussampaio',
        'moises',
        'rodolfo'
      ]
    }
  })
})
