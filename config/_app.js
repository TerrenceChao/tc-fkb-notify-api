/**
 * [infrastructure-configuration]
 */

module.exports = {
  headers: {
    'content-type': 'application/json'
  },
  retryLimit: parseInt(process.env.RETRY_LIMIT) || 3,
  delay: parseInt(process.env.DELAY) || 500,
  interval: parseInt(process.env.INTERVAL) || 60
}
