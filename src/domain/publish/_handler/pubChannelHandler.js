const producer = require(`../../../../infrastructure/message_queue/rabbitmq/${process.env.PRODUCER}`)

/**
 * plan D:
 * 著重在訂閱階段，並且每種 channel 獨立建立一張資料表(table email, sms, ... etc)：
 * 1. 在 subscriber 才建立資料。(但要注意在 queue 異常，發生重送機制時[勿重複建立]資料)
 * 2. 讀取該 subscriber 才需要處理的[特定id] 且 [有限且尚未處理過]的紀錄。(MOD K = 1 for s1, MOD K = 2 for s2, ...MOD K = N for sN)
 * 3. 處理該訊息。 (藉由 SMS, email, ... etc)
 * 4. 更新狀態為[已處理]。
 * [現在關鍵變成如何讓"同一個subscriber"在短時間內讀取到"非重複"的records?]
 * [如果訊息直接丟失的話，就沒轍了...但rabbitmq不就是保證訊息不能丟失嗎？]
 */
module.exports = function (channelQueues, message) {
  return Promise.all(channelQueues.map(queue => {
    producer.sendQueueMsg(queue, JSON.stringify(message), status => console.log(`sent status: ${queue} >> ${status}`))
  }))
}
