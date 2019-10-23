const producer = require('../../../../infrastructure/message_queue/rabbitmq/producer')

/**
 * TODO:
 * 1. create record in DB
 * 2. read record(s) in DB that is/are not sent {sent: 0} (or failure?)
 * 3. publish multiple messages (could be a lot bytes???) depends on API requests frequence
 *
 *
 * Or Better Way:???
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
 * 1. create record with pX(current publisher label) in DB.
 * 2. read record(s) with pX in DB that is/are not sent: {sent: 0}. (or failure?)
 * 3. publish multiple messages (could be a lot bytes???) depends on API requests frequence.
 *
 * plan C:
 * 取 record id 的 MOD 值發送。(mod K, 假設 K = 10)。
 * TODO: [improved]
 * 1. create record in DB.
 * 2. read record(s) where id mod 10 = P ("P"= 0 ~ 9, 由 redis 紀錄並累加) in DB that is/are not sent {sent: 0}. (or failure?)
 * 3. publish multiple messages (could be a lot bytes???) depends on API requests frequence.
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
 * 1. publish one message.
 */
module.exports = function (queueCategory, message) {
  return producer.sendQueueMsg(queueCategory, JSON.stringify(message), (status) => {
    console.log(`sent status: ${status}`)
  })
}
