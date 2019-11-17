const _ = require('lodash')
const publishHandler = require('../../../domain/publish/_handler/publishHandler')
const subscribeHandler = require('../../../domain/subscribe/_handler/subscribeHandler')

exports.publish = (req, res, next) => {
  subscribeHandler.linkage()
  Promise.resolve(publishHandler(req.body.category, _.omit(req.body, ['category'])))
    .then(() => next())
    .catch(err => next(err))
}
