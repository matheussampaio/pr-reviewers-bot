class UniqueQueue {
  constructor (elements = []) {
    this.set = new Set()

    this.addAll(elements)
  }

  add (element) {
    this.set.add(element)
  }

  addAll (elements) {
    elements.forEach(element => this.add(element))
  }

  delete (element) {
    return this.set.delete(element) ? element : null
  }

  size () {
    return this.set.size
  }

  isEmpty () {
    return this.set.size === 0
  }

  get (index) {
    return index <= this.getAll().length && index >= 0 ? this.getAll()[index] : null
  }

  getAll () {
    return Array.from(this.set)
  }
}

module.exports = UniqueQueue
