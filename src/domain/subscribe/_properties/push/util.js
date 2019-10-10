/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

const request = require('request')
const {
  MESSAGING_HEADERS,
  MESSAGING_PUSH_URL,
  RETRY_LIMIT,
  DELAY
} = require('../constant')

/**
 * 對 message-service 推播訊息
 * @param {array} userList 
 * @param {Object} content 
 */
function messagingRequest(userList, packet, retry = 0) {
  return new Promise((resolve, reject) => {
    request({
      method: 'PATCH',
      url: MESSAGING_PUSH_URL,
      headers: MESSAGING_HEADERS,
      body: {
        receivers: userList,
        event: packet.event,
        content: packet.content
      },
      json: true
    }, (err, response, body) => {
      if (! err && response.statusCode === 200) {
        console.log(`\nrequest success as ${MESSAGING_PUSH_URL}: \nbody`, body, `\n`)
        return resolve(body)
      }

      if (! err && response.statusCode === 422) {
        console.log(`\ninvalid request format:\n status code: ${response.statusCode}\nbody`, body, `\n`)
        return resolve(body)
      }

      if (retry < RETRY_LIMIT) {
        console.error(`\nmessaging req fail: `, err || body, `\n`)
        setTimeout(() => resolve(messagingRequest(userList, packet, ++retry)), DELAY)
      } else {
        console.error(`\nmessaging req fail!\nreach the retry limit: ${RETRY_LIMIT}\n`)
        reject(err || body)
      }
    })
  })
}

module.exports = {
  messagingRequest,
}