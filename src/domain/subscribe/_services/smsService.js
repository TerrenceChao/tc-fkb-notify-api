var _ = require('lodash')
var help = require('../_properties/helper')
var util = require('../_properties/sms/util')


/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 *    [但你要知道是否有重複建立的紀錄就不得不await...]
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
module.exports = function (package) {
  const subject = package.packet.event
  const material = package.packet.content
  const content = util.genSMSContent(subject, material)

  // console.log(`原始 sms 封包:`, material)
  // console.log(` sms content subject:`, subject)
  // console.log(`sms content:`, [content])

  return Promise.resolve(help.fetchContact(package.receivers, ['phone']))
    .then(receiverList => console.log(`\nSMS(Phone) receivers:`, receiverList, `\n`))
    .catch(err => console.error('\nError caught (sms service):', err, `\n`))
}