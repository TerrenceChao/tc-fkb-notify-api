var helper = require('../_properties/helper')


/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 *    [但你要知道是否有重複建立的紀錄就不得不await...]
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
module.exports = function (package) {
  try {
    const receivers = package.receivers
    const content = package.packet.content

    console.log(`internal-search content:`, content)
  } catch(err) {
    console.error(`\nError caught (internal-search service):`, err, `\n`)
  }
}
