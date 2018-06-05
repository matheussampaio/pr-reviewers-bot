const test = require('ava')

const Reviewers = require('../src/reviewers')

const team = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']

test('it should return the first reviewer', t => {
  const reviewers = new Reviewers({ team })

  t.deepEqual(reviewers.getReviewers(), ['p1'])
})

test('it should return the second user, after suggesting the first user', t => {
  const reviewers = new Reviewers({ team })

  reviewers.getReviewers()

  t.deepEqual(reviewers.getReviewers(), ['p2'])
})

test('it should continue the list of reviewers', t => {
  const reviewers = new Reviewers({ team, queue: ['p5', 'p6'] })

  t.deepEqual(reviewers.getReviewers(), ['p5'])
})

test('it should return the second user, after suggesting the first user, even when continuing the list', t => {
  const reviewers = new Reviewers({ team, queue: ['p5', 'p6'] })

  reviewers.getReviewers()

  t.deepEqual(reviewers.getReviewers(), ['p6'])
})

test('pop two reviewers', t => {
  const reviewers = new Reviewers({ team, numberOfReviewers: 2 })

  t.deepEqual(reviewers.getReviewers(), ['p1', 'p2'])
})

test('pop two reviewers', t => {
  const reviewers = new Reviewers({ team, numberOfReviewers: 2 })

  t.deepEqual(reviewers.getReviewers(), ['p1', 'p2'])
})

test('it should continue the list of reviewers when popping more than one', t => {
  const reviewers = new Reviewers({ team, numberOfReviewers: 2, queue: ['p5', 'p6'] })

  t.deepEqual(reviewers.getReviewers(), ['p5', 'p6'])
})

test('if restart the list after suggesting everyone', t => {
  const reviewers = new Reviewers({ team, queue: ['p9', 'p10'], numberOfReviewers: 5 })

  t.deepEqual(reviewers.getReviewers(), ['p9', 'p10', 'p1', 'p2', 'p3'])
})

test('if numberOfReviwers is to big, it should return what is available', t => {
  const reviewers = new Reviewers({ team, numberOfReviewers: Infinity })

  t.deepEqual(reviewers.getReviewers(), team)
})

test('it should filter users', t => {
  const reviewers = new Reviewers({ team })

  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p1'] }), ['p2'])
})

test('when filtering users, they should be the next in line', t => {
  const reviewers = new Reviewers({ team: ['p1', 'p2', 'p3', 'p4', 'p5'], numberOfReviewers: 2 })

  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p2'] }), ['p1', 'p3'])
  t.deepEqual(reviewers.queue.getAll(), ['p2', 'p4', 'p5'])
  t.deepEqual(reviewers.getReviewers(), ['p2', 'p4'])
})

test('it should skip filtered users', t => {
  const reviewers = new Reviewers({ team, queue: ['p1'], numberOfReviewers: 3 })

  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p1'] }), ['p2', 'p3', 'p4'])
})

test('it should throw if the whole team is filtered', t => {
  const reviewers = new Reviewers({ team })

  t.throws(() => reviewers.getReviewers({ filterUsers: team }))
})

test('it should throw if not enough available reviewers', t => {
  const reviewers = new Reviewers({ team, numberOfReviewers: 10 })

  t.throws(() => reviewers.getReviewers({ filterUsers: ['p1', 'p2'] }))
})

test('xxxx', t => {
  const reviewers = new Reviewers({ team: [ 'p1', 'p2', 'p3', 'p4', 'p5' ], numberOfReviewers: 3 })

  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p1'] }), ['p2', 'p3', 'p4'])
  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p4'] }), ['p1', 'p5', 'p2'])
  t.deepEqual(reviewers.getReviewers({ filterUsers: ['p3'] }), ['p1', 'p4', 'p5'])
})
