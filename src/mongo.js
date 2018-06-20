const monk = require('monk')

const db = monk(process.env.MONGODB_URI || 'mongodb://mongo:27017')

module.exports = db
