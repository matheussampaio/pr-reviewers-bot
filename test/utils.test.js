const test = require('ava')

const { md5 } = require('../src/utils')

test('md5 should calculate hash of strings', t => {
  const hash = md5('Hello World!')

  t.is(hash, 'ed076287532e86365e841e92bfc50d8c')
})

test('md5 should calculate hash of arrays', t => {
  const hash = md5(['a', 'b', 'c'])

  t.is(hash, 'c29a5747d698b2f95cdfd5ed6502f19d')
})

test('calculate different hash for different teams', async t => {
  const team = ['different_team']

  t.is(md5(team), '77a3c03fb5fa000b9677ca9710cf1438')
})
