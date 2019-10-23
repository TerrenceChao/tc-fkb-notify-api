var help = require('../_properties/helper')
var util = require('../_properties/internal-search/util')
const {
  ACCOUNT_IDENTITY,
  SEARCH_EVENT_REGISTRATION,
  SEARCH_EVENT_UPDATE_PUBLIC_INFO
} = require('../_properties/constant')

const operation = {
  [SEARCH_EVENT_REGISTRATION]: util.createDoc,
  [SEARCH_EVENT_UPDATE_PUBLIC_INFO]: util.updateDoc
}

/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 *    [但你要知道是否有重複建立的紀錄就不得不await...]
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
module.exports = function (messagePkg) {
  // try {
  const receivers = messagePkg.receivers
  const event = messagePkg.packet.event
  const content = messagePkg.packet.content

  //   console.log(`\ninternal-search \nreceivers:`, receivers)
  //   console.log(`\n{internal search} event:`, event, `\n`)
  //   console.log(`content:`, content, `\n`)
  // } catch(err) {
  //   console.error(`\nError caught (internal-search service):`, err, `\n`)
  // }

  return Promise.resolve(help.fetchContact(receivers, ACCOUNT_IDENTITY))
    .then(receiverList => receiverList.forEach(receiver => operation[event](receiver, content)))
    .catch(err => console.error('\nError caught (internal-search service):', err, '\n'))
}
