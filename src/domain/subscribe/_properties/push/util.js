/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

var help = require('../helper')
const request = require('request')
const {
  HEADERS,
  MESSAGING_PUSH_URL,
  RETRY_LIMIT,
  DELAY
} = require('../constant')

/**
 * 對 message-service 推播訊息
 * @param {array} userList 
 * @param {Object} packet 
 */
function messagingRequest(userList, packet) {
  return Promise.resolve({
    method: 'PATCH',
      url: MESSAGING_PUSH_URL,
      headers: HEADERS,
      body: {
        receivers: userList,
        event: packet.event,
        content: packet.content
      },
      json: true
  })
  .then(options => help.requestHandler(`messaging`, options))
  .catch(err => console.error(err))

}

module.exports = {
  messagingRequest,
}