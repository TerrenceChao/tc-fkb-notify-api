const _ = require('lodash')
const publishHandler = require('../../../domain/publish/_handler/publishHandler')
const subscribeHandler = require('../../../domain/subscribe/_handler/subscribeHandler')

exports.publish = (req, res, next) => {
  publishHandler(req.body.category, _.omit(req.body, ['category']))
  subscribeHandler()
  next()
}

// exports.subscribe = (req, res, next) => {
//   subscribeHandler()
//   next()
// }