var fetchContact = require('../_properties/helper').fetchContact
var util = require('../_properties/push/util')
const ACCOUNT_IDENTITY = require('../_properties/constant').ACCOUNT_IDENTITY

/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 *    [但你要知道是否有重複建立的紀錄就不得不await...]
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
module.exports = function (messagePkg) {
  console.log('web-push sender:', messagePkg.sender)

  return Promise.resolve(fetchContact(messagePkg.receivers, ACCOUNT_IDENTITY))
    .then(userList => util.messagingRequest(userList, messagePkg.packet))
    .catch(err => console.error('\nError caught (web-push service):', err, '\n'))
}
