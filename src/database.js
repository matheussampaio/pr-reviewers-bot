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

  setQueue (queue) {
    return mongo.get('projects').update({ name: this.namespace }, { name: this.namespace, queue }, { upsert: true })
  }

  clearQueue () {
    return this.setQueue([])
  }

  async getTeamHash () {
    const project = await mongo.get('projects').findOne({ name: this.namespace })

    return _.get(project, 'teamHash', '')
  }

  setTeamHash (teamHash) {
    return mongo.get('projects').update({ name: this.namespace }, { name: this.namespace, teamHash }, { upsert: true })
  }
}

module.exports = Database
