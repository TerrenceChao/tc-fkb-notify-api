let amqp = require('amqplib')

class RabbitMQ {
  constructor() {
    this.hosts = []
    this.index = 0
    this.length = this.hosts.length
    this.open = amqp.connect(this.hosts[this.index])
  }

  receiveQueueMsg(queueName, receiveCallBack, callbackMsg) {
    let self = this

    self.open
        .then((conn) => conn.createChannel())
        .then((channel) => channel
            .assertQueue(queueName)
            .then((ok) => channel
                .consume(queueName, function (msg) {
                    if (msg !== null) {
                        let data = msg.content.toString()
                        channel.ack(msg)
                        receiveCallBack && receiveCallBack(data)
                    }
                })
                .finally(() => setTimeout(() => {
                    if (channel) { channel.close() }
                }, 500))
            )
        )
        .catch(() => {
            let num = self.index++
            if (num <= self.length - 1) {
                self.open = amqp.connect(self.hosts[num])
            } else {
                self.index = 0
                self.open = amqp.connect(self.hosts[0])
            }
        })
  }
}


module.exports = new RabbitMQ()
