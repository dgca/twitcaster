
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./fake-tweet.cjs.production.min.js')
} else {
  module.exports = require('./fake-tweet.cjs.development.js')
}
