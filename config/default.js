require('dotenv').config()

module.exports = {
  app: require('./_app'),
  mq: require('./_mq'),
  sms: require('./_sms'),
  email: require('./_email'),
  appPush: require('./_appPush'),
  search: require('./_search'),
  message: require('./_message'),
  frontend: require('./_frontend')
}
