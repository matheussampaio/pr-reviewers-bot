const crypto = require('crypto')

function md5(data) {
  const dataAsString = typeof data === 'string' ? data : JSON.stringify(data)

  return crypto.createHash('md5')
    .update(dataAsString)
    .digest('hex')
}

module.exports = { md5 }
