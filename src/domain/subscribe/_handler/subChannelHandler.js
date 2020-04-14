const EventEmitter = require('events').EventEmitter
const consumer = require(`../../../../infrastructure/message_queue/rabbitmq/${process.env.CONSUMER}`)
const CHANNELS = require('../_properties/constant').CHANNELS
const emailService = require('../_services/emailService')
const smsService = require('../_services/smsService')
const appPushService = require('../_services/appPushService')
const webPushService = require('../_services/webPushService')
const internalSearchService = require('../_services/internalSearchService')
const recallService = require('../_services/recallService')
const pushService = require('../_services/pushService')

const SERVICES = new Map([
  ['email', emailService],
  ['sms', smsService],
  ['app-push', appPushService],
  ['web-push', webPushService],
  ['internal-search', internalSearchService],
  ['recall', recallService],
  ['push', pushService]
])

/**
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */
const linkageEvent = new EventEmitter()
CHANNELS.forEach(channelQueue => {
  linkageEvent.on(channelQueue, () => {
    consumer.receiveQueueMsg(
      channelQueue,
      message => Promise.resolve(SERVICES.get(channelQueue)(JSON.parse(message))).then(() => linkageEvent.emit(channelQueue))
    )
      .catch(err => console.error(err))
  })
})

module.exports = {
  linkage: () => CHANNELS.forEach(channelQueue => linkageEvent.emit(channelQueue))
}
