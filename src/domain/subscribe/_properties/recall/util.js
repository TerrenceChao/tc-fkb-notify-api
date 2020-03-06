/**
 * 當用戶更新自己的公開個資 (ex: name, profilePic),
 * 需連動回 folk-api 更新朋友各自的朋友列表資訊 (public_info),
 * 會是 bulk update. 端視你有多少朋友。
 *
 * 須更新的範圍：
 *    uid,              friend_id,            friend_region
 *    用戶朋友 uid,       用戶 uid,             用戶 region
 */

var help = require('../helper')
const {
  HEADERS
} = require('../constant')

/**
 * 對 folk-service 推播訊息
 * @param {array} userList
 * @param {Object} packet
 */
function folkRequest (userList, packet) {
  return Promise.resolve({
    method: 'PUT',
    // TODO: apply fkb-folk-api host
    url: 'fkb-folk-api host',
    headers: HEADERS,
    body: {
      receivers: userList,
      event: packet.event,
      content: packet.content
    },
    json: true
  })
    .then(options => help.requestHandler('bulk-update-friends-record', options))
    .catch(err => console.error(err))
}

module.exports = {
  folkRequest
}
