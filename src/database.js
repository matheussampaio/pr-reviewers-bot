const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(process.env.DATABASE_FILENAME || 'db.json')
const db = low(adapter)

const DEFAULTS = {
  queue: []
}

class Database {
  constructor(namespace) {
    this.namespace = namespace

    this.init()
  }

  init() {
    db.defaults({ [this.namespace]: DEFAULTS }).write()
  }

  getQueue() {
    return db.get(`${this.namespace}.queue`).value()
  }

  setQueue(queue) {
    db.set(`${this.namespace}.queue`, queue).write()
  }
}

module.exports = Database
