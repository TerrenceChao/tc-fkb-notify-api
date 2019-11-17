const amqp = require('amqplib')

class RabbitMQ {
  constructor () {
    this.connect()
  }

  connect () {
    this.hosts = []
    this.index = 0
    this.length = this.hosts.length
    this.open = amqp.connect(this.hosts[this.index])

    return this.open
  }

  reconnect () {
    const num = this.index++
    if (num <= this.length - 1) {
      this.open = amqp.connect(this.hosts[num])
    } else {
      this.index = 0
    }

    return this.open
  }

  sendQueueMsg (queueName, msg, callbackMsg) {
    const self = this

    return Promise.resolve(self.open)
      .then((conn) => conn.createChannel())
      .then((channel) => channel.assertQueue(queueName, { durable: true })
        .then(ok => channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true }))
        .then(data => {
          if (data) {
            callbackMsg && callbackMsg('success')
            channel.close()
          }
        })
        .catch(err => {
          console.error('[ERROR]', err)
          setTimeout(() => {
            if (channel) { channel.close() }
          }, 500)

          return Promise.reject(new Error('message publish fail'))
        })
      )
      .catch(err => {
        console.error('[ERROR]', err)
        self.connect()

        return Promise.reject(new Error('message publish fail'))
      })
  }
}

module.exports = new RabbitMQ()
