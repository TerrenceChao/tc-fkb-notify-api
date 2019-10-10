var _ = require('lodash')
var request = require('request')
var hasKeys = require('../../../property/util').hasKeys
const CONTACT_FIELDS = require('./constant').CONTACT_FIELDS

/**
 * TODO: 這裡可以善用 redis R/W
 * userInfo 包含 accountIdentity。
 * 雖然大多時候 param 1 僅僅只是 accountIdentity(region, uid) 列表,
 * 但 param 1 有少部份情況會是完整的 userInfo(包含 phone, email, ... etc) 列表
 * @param {array} userInfoList 
 * @param {array} selectFields 
 */
function fetchContact(userInfoList, selectFields = CONTACT_FIELDS) {
  return Promise.all(userInfoList.map(userInfo => {
      if (hasKeys(userInfo, selectFields)) {
        return userInfo
      }

      return _.assignIn(userInfo, {'xxx': 'ooo'})

      // TODO: 這裡可以善用 redis 儲存最近的 user 聯繫資料
      // Read contact data from redis. Save data to redis if missed.

      /**
       * [NOTE]
       * 這裡不需要 retry, 增加 folk-api 的負擔！！！
       * (notify-api, message-api 業務單純，可以重試)
       */
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: ``,
          headers: {}
        }, (err, response, body) => {
          if (err) {
            return reject(err)
          }
          
          // do some preprocess...
          return resolve(_.assignIn(userInfo, body))
        })
      })
    }))
}


module.exports = {
  fetchContact,
}