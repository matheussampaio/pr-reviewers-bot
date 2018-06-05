const test = require('ava')

const UniqueQueue = require('../src/unique-queue')

test('it can get all element', t => {
  const queue = new UniqueQueue()

  t.deepEqual(queue.getAll(), [])
})

test('it can add an element', t => {
  const queue = new UniqueQueue()

  queue.add(1)

  t.deepEqual(queue.getAll(), [1])
})

test('does not add duplicated elements', t => {
  const queue = new UniqueQueue()

  queue.add(1)
  queue.add(1)

  t.deepEqual(queue.getAll(), [1])
})

test('it deletes element', t => {
  const queue = new UniqueQueue()

  queue.add(1)
  queue.delete(1)

  t.deepEqual(queue.getAll(), [])
})

test('it returns the size of set', t => {
  const queue = new UniqueQueue()

  queue.addAll([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])

  t.deepEqual(queue.size(), 5)
})

test('it adds all elements', t => {
  const queue = new UniqueQueue()

  queue.addAll([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])

  t.deepEqual(queue.getAll(), [1, 2, 3, 4, 5])
})

test('it should be empty when size is zero', t => {
  const queue = new UniqueQueue()

  t.true(queue.isEmpty())
})

test('it should not be empty when size is not zero', t => {
  const queue = new UniqueQueue()

  queue.add(1)

  t.false(queue.isEmpty())
})

test('it should not be empty when size is not zero', t => {
  const queue = new UniqueQueue([1, 2, 3, 4, 5])

  t.deepEqual(queue.getAll(), [1, 2, 3, 4, 5])
})
