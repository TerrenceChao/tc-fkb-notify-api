const EventEmitter = require('events').EventEmitter
const consumer = require(`../../../../infrastructure/message_queue/rabbitmq/${process.env.CONSUMER}`)
const taskHandler = require('./taskHandler')
const CATEGORIES = require('../_properties/constant').CATEGORIES
const C = require('../_properties/constant')

/**
 * TODO:
 * 1. check records in DB are not sent {sent: 0}
 * 2. process messages (read multiple user info according {uid, region} and deliver messages)
 * 3. update records: { sent++ }
 *
 *
 * Or Better Way:
 * 關鍵是如何讓 publisher 在短時間內讀取到[非重複]的 records?
 *
 * [經水平擴展後，在累計多個訊息才一次發布的情境下，針對同一個用戶的訊息，此服務並沒有保證訊息具有FIFO的順序性]
 * Assume there're publish instances(publishers) M and subscribe instances(subscribers) N,
 * publishers are repected as p1, p2, p3, ... pM;
 * subscribers are repected as s1, s2, s3, ... sN.
 *
 * plan A:
 * 消耗速度一定要比生產速度快，讓 subscriber 個數比 publisher 來得更多是一個方法。(N > M)
 * [必要條件]
 *
 * plan B:
 * 為了避免 publishers & subscribers 因為處理的時間差 (sent: 1/0 重複處理) 使得有些訊息重複發送,
 * 在 DB 欄位中多紀錄 pX 的資訊。藉由不同的 pX 去降低重複讀取的可能性。
 * TODO: [improved]
 * 1. process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 2. update records with pX(publisher label): { sent++ }
 *
 * plan C:
 * 取 record id 的 MOD 值發送。
 * TODO: [improved]
 * The same as plan B.
 *
 * plan D:
 * 著重在訂閱階段，並且每種 channel 獨立建立一張資料表(table email, sms, ... etc)：
 * 1. 在 subscriber 才建立資料。(但要注意在 queue 異常，發生重送機制時[勿重複建立]資料)
 * 2. 讀取該 subscriber 才需要處理的[特定id] 且 [有限且尚未處理過]的紀錄。(MOD K = 1 for s1, MOD K = 2 for s2, ...MOD K = N for sN)
 * 3. 處理該訊息。 (藉由 SMS, email, ... etc)
 * 4. 更新狀態為[已處理]。
 * [現在關鍵變成如何讓"同一個subscriber"在短時間內讀取到"非重複"的records?]
 * [如果訊息直接丟失的話，就沒轍了...但rabbitmq不就是保證訊息不能丟失嗎？]
 *
 * TODO: [special-improved]
 * 1. [no-await] create one record({sent: 0}) in DB if there's [no-duplicate].
 * 2. [await] read multiple unsent records({sent: 0}) with specific id(assume K = 10. MOD 10 = 6 for s6) in DB.
 * 3. [await] process messages. (read multiple user info according {uid, region} and deliver messages by SMS,email,...etc)
 * 4. [await] update msgs status: {sent: 1}
 */

const linkageEvent = new EventEmitter()
CATEGORIES.forEach(queueCategory => {
  linkageEvent.on(queueCategory, () => {
    consumer.receiveQueueMsg(
      queueCategory,
      message => taskHandler(JSON.parse(message)).then(() => linkageEvent.emit(queueCategory))
    )
      .catch(err => console.error(err))
  })
})

const intervalEvent = new EventEmitter()
CATEGORIES.forEach(queueCategory => {
  intervalEvent.on(queueCategory, () => {
    consumer
      .receiveQueueMsg(queueCategory, message => taskHandler(JSON.parse(message)))
      .catch(err => console.error(err))
  })
})

const intervalConsume = () => {
  return setInterval(() => {
    CATEGORIES.forEach(queueCategory => intervalEvent.emit(queueCategory))
  }, C.INTERVAL)
}

module.exports = {
  linkage: () => CATEGORIES.forEach(queueCategory => linkageEvent.emit(queueCategory)),
  interval: () => {
    clearInterval(intervalConsume)
    intervalConsume()
  }
}
