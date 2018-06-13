const _ = require('lodash')
const axios = require('axios')

const BIN_URL = `https://api.jsonbin.io/b/${process.env.JSONBIN_ID}`

class JSONBin {
  static async read () {
    const { data } = await axios.get(`${BIN_URL}/latest`, {
      headers: {
        'secret-key': process.env.JSONBIN_KEY
      }
    })

    return data || {}
  }

  static async save (data) {
    await axios.put(BIN_URL, data, {
      headers: {
        'secret-key': process.env.JSONBIN_KEY
      }
    })
  }
}

class Database {
  constructor (namespace) {
    this.namespace = namespace
  }

  async getQueue () {
    const data = await JSONBin.read()

    return _.get(data, [this.namespace, 'queue'], [])
  }

  async setQueue (queue) {
    const data = await JSONBin.read()

    _.set(data, [this.namespace, 'queue'], queue)

    return JSONBin.save(data)
  }
}

module.exports = Database
