const _ = require('lodash')

const mongo = require('./mongo')

class Database {
  constructor (namespace) {
    this.namespace = namespace
  }

  async getQueue () {
    const project = await mongo.get('projects').findOne({ name: this.namespace })

    return _.get(project, 'queue', [])
  }

  async setQueue (queue) {
    console.log('Database:setQueue')

    await mongo.get('projects').update({ name: this.namespace }, { name: this.namespace, queue }, { upsert: true })
  }
}

module.exports = Database
