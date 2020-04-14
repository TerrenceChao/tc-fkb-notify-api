const _ = require('lodash')
const pubCategoryHandler = require('../../../domain/publish/_handler/pubCategoryHandler')
const subCategoryHandler = require('../../../domain/subscribe/_handler/subCategoryHandler')
const pubChannelHandler = require('../../../domain/publish/_handler/pubChannelHandler')
const subChannelHandler = require('../../../domain/subscribe/_handler/subChannelHandler')

exports.publishByCategory = (req, res, next) => {
  subCategoryHandler.linkage()
  Promise.resolve(pubCategoryHandler(req.body.category, _.omit(req.body, ['category'])))
    .then(() => next())
    .catch(err => next(err))
}

exports.publish = (req, res, next) => {
  subChannelHandler.linkage()
  Promise.resolve(pubChannelHandler(req.body.channels, _.omit(req.body, ['channels'])))
    .then(() => next())
    .catch(err => next(err))
}
