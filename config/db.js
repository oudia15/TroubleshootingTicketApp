const crypto = require('crypto');

module.exports = {
  uri: 'mongodb://localhost:27017/tickets',
  secret: crypto.randomBytes(256).toString('hex')
}
