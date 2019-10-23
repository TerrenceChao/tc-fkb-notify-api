require('dotenv').config()

module.exports = {
  app: require('./_app'),
  email: require('./_email'),
  message: require('./_message'),
  frontend: require('./_frontend'),
  search: require('./_search'),
}
