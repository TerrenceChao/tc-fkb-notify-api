module.exports = {
  vendor: {
    rabbitmq: {
      hosts: process.env.RABBITMQ_HOSTS.split(',')
    }
  },
  specify: process.env.MQ_VENDOR
}
