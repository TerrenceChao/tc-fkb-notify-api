var _ = require('lodash')
var request = require('request')
var hasKeys = require('../../../property/util').hasKeys
const C = require('./constant')
const STATUS_CODE = {
  GET: 200,
  POST: 201,
  PUT: 200,
  PATCH: 200,
  DELETE: 200
}

/**
 * TODO: 這裡可以善用 redis R/W
 * userInfo 包含 accountIdentity。
 * 雖然大多時候 param 1 僅僅只是 accountIdentity(region, uid) 列表,
 * 但 param 1 有少部份情況會是完整的 userInfo(包含 phone, email, ... etc) 列表
 * @param {array} userInfoList
 * @param {array} selectFields
 */
function fetchContact (userInfoList, selectFields = C.ACCOUNT_CONTACT_FIELDS) {
  return Promise.all(userInfoList.map(userInfo => {
    if (hasKeys(userInfo, selectFields)) {
      return userInfo
    }

    return _.assignIn(userInfo, { xxx: 'ooo' })

    // TODO: 這裡可以善用 redis 儲存最近的 user 聯繫資料
    // Read contact data from redis. Save data to redis if missed.

    // /**
    //  * [NOTE]
    //  * 這裡不需要 retry, 增加 folk-api 的負擔！！！
    //  * (notify-api, message-api 業務單純，可以重試)
    //  */
    // return new Promise((resolve, reject) => {
    //   request({
    //     method: 'GET',
    //     url: ``,
    //     headers: {}
    //   }, (err, response, body) => {
    //     if (err) {
    //       return reject(err)
    //     }

    //     // do some preprocess...
    //     return resolve(_.assignIn(userInfo, body))
    //   })
    // })
  }))
}

/**
 *
 * @param {string} desc  request desction
 * @param {Object} options request params
 * @param {Object} successCode status code if success
 * @param {number} retry
 */
function requestHandler (desc, options, successCode = null, retry = 0) {
  return new Promise((resolve, reject) => {
    const success = successCode ? successCode : STATUS_CODE[options.method]

    request(options, (err, response, body) => {
      if (! err && response.statusCode === success) {
        console.log(`\n[${desc}] request success as ${options.url}: \nbody`, body, '\n')
        return resolve(body)
      }

      if (! err && response.statusCode === 422) {
        console.log(`\ninvalid request format:\n status code: ${response.statusCode}\nbody`, body, '\n')
        return resolve(body)
      }

      if (retry < C.RETRY_LIMIT) {
        console.error(`\n[${desc}] request FAIL: `, err || body, '\n')
        setTimeout(() => resolve(requestHandler(desc, options, successCode, ++retry)), C.DELAY)
      } else {
        console.error(`\n[${desc}] request FAIL!\nreach the retry limit: ${C.RETRY_LIMIT}\n`)
        reject(err || body)
      }
    })
  })
}

module.exports = {
  fetchContact,
  requestHandler
}
