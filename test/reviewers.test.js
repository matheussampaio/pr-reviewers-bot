const test = require('ava')

const reviewers = require('../src/reviewers')

const team = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']

test('if current index is not passed, should return the first guy in the team', t => {
  const nextReviewer = reviewers.getNextReviewers({ team })

  t.deepEqual(nextReviewer, ['p1'])
})

test('return null if team is empty', t => {
  t.deepEqual(reviewers.getNextReviewers(), null)
})

test('if lastReviewer is defined, continue from him', t => {
  const nextReviewer = reviewers.getNextReviewers({ team, lastReviewer: 'p3' })

  t.deepEqual(nextReviewer, ['p4'])
})

test('if lastReviewer is not included in the team, return the first team member', t => {
  const nextReviewer = reviewers.getNextReviewers({ team, lastReviewer: 'nope' })

  t.deepEqual(nextReviewer, ['p1'])
})

test('if lastReviewer is the last guy in the team, next reviewer should be the first guy in the team', t => {
  const nextReviewer = reviewers.getNextReviewers({ team, lastReviewer: 'p10' })

  t.deepEqual(nextReviewer, ['p1'])
})

test('if numberOfReviewers is defined, return this number of reviewers', t => {
  const nextReviewer = reviewers.getNextReviewers({ team, numberOfReviewers: 3 })

  t.deepEqual(nextReviewer, ['p1', 'p2', 'p3'])
})

test('if numberOfReviwers is to big, it should return what is available', t => {
  const nextReviewers = reviewers.getNextReviewers({ team: team.slice(0, 5), numberOfReviewers: 10 })

  t.deepEqual(nextReviewers, ['p1', 'p2', 'p3', 'p4', 'p5'])
})

test('it should start from the beginning after reaching the end', t => {
  const nextReviewers = reviewers.getNextReviewers({ team, lastReviewer: 'p8', numberOfReviewers: 4 })

  t.deepEqual(nextReviewers, ['p9', 'p10', 'p1'])
})

