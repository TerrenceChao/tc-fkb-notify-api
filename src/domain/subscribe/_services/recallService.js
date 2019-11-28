var util = require('../_properties/recall/util')

/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 *    [但你要知道是否有重複建立的紀錄就不得不await...]
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
module.exports = function (messagePkg) {
  // const subject = messagePkg.packet.event
  // const content = messagePkg.packet.content

  console.log('recall sender:', messagePkg.sender)
  // console.log(`recall receivers:`, messagePkg.receivers)
  // console.log(` recall content subject:`, subject)
  // console.log(`recall content:`, [content])

  return Promise.resolve(true)
    .catch(err => console.error('\nError caught (recall service):', err, '\n'))
}
