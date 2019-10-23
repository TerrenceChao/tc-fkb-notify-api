const _ = require('lodash')

/**
 *
 * @param {Object} object
 * @param {array} requiredKeys
 */
function hasKeys (object, requiredKeys) {
  return _.every(requiredKeys, _.partial(_.has, object))
}

module.exports = {
  hasKeys
}
