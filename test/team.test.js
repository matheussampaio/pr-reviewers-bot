const test = require('ava')

const Team = require('../src/team')
const teamMembers = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']

test('it should return the first reviewer', t => {
  const team = new Team({ team: teamMembers })

  t.deepEqual(team.getNextReviewers(), ['p1'])
})

test('it should return the second user, after suggesting the first user', t => {
  const team = new Team({ team: teamMembers })

  team.getNextReviewers()

  t.deepEqual(team.getNextReviewers(), ['p2'])
})

test('it should continue the list of reviewers', t => {
  const team = new Team({ team: teamMembers, queue: ['p5', 'p6'] })

  t.deepEqual(team.getNextReviewers(), ['p5'])
})

test('it should return the second user, after suggesting the first user, even when continuing the list', t => {
  const team = new Team({ team: teamMembers, queue: ['p5', 'p6'] })

  team.getNextReviewers()

  t.deepEqual(team.getNextReviewers(), ['p6'])
})

test('pop two reviewers', t => {
  const team = new Team({ team: teamMembers, numberOfReviewers: 2 })

  t.deepEqual(team.getNextReviewers(), ['p1', 'p2'])
})

test('pop two reviewers', t => {
  const team = new Team({ team: teamMembers, numberOfReviewers: 2 })

  t.deepEqual(team.getNextReviewers(), ['p1', 'p2'])
})

test('it should continue the list of reviewers when popping more than one', t => {
  const team = new Team({ team: teamMembers, numberOfReviewers: 2, queue: ['p5', 'p6'] })

  t.deepEqual(team.getNextReviewers(), ['p5', 'p6'])
})

test('if restart the list after suggesting everyone', t => {
  const team = new Team({ team: teamMembers, queue: ['p9', 'p10'], numberOfReviewers: 5 })

  t.deepEqual(team.getNextReviewers(), ['p9', 'p10', 'p1', 'p2', 'p3'])
})

test('if numberOfReviwers is to big, it should return what is available', t => {
  const team = new Team({ team: teamMembers, numberOfReviewers: Infinity })

  t.deepEqual(team.getNextReviewers(), teamMembers)
})

test('it should filter users', t => {
  const team = new Team({ team: teamMembers })

  t.deepEqual(team.getNextReviewers({ filterUsers: ['p1'] }), ['p2'])
})

test('when filtering users, they should be the next in line', t => {
  const team = new Team({ team: ['p1', 'p2', 'p3', 'p4', 'p5'], numberOfReviewers: 2 })

  t.deepEqual(team.getNextReviewers({ filterUsers: ['p2'] }), ['p1', 'p3'])
  t.deepEqual(team.getQueue(), ['p2', 'p4', 'p5'])
  t.deepEqual(team.getNextReviewers(), ['p2', 'p4'])
})

test('it should skip filtered users', t => {
  const team = new Team({ team: teamMembers, queue: ['p1'], numberOfReviewers: 3 })

  t.deepEqual(team.getNextReviewers({ filterUsers: ['p1'] }), ['p2', 'p3', 'p4'])
})

test('it should throw if the whole team is filtered', t => {
  const team = new Team({ team: teamMembers })

  t.throws(() => team.getNextReviewers({ filterUsers: teamMembers }))
})

test('it should throw if not enough available reviewers', t => {
  const team = new Team({ team: teamMembers, numberOfReviewers: 10 })

  t.throws(() => team.getNextReviewers({ filterUsers: ['p1', 'p2'] }))
})

test('xxxx', t => {
  const team = new Team({ team: [ 'p1', 'p2', 'p3', 'p4', 'p5' ], numberOfReviewers: 3 })

  t.deepEqual(team.getNextReviewers({ filterUsers: ['p1'] }), ['p2', 'p3', 'p4'])
  t.deepEqual(team.getNextReviewers({ filterUsers: ['p4'] }), ['p1', 'p5', 'p2'])
  t.deepEqual(team.getNextReviewers({ filterUsers: ['p3'] }), ['p1', 'p4', 'p5'])
})
