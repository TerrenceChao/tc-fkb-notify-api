/**
 * [infrastructure-configuration]
 */

module.exports = {
  domain: process.env.MESSAGING_DOMAIN,
  pushUrl: `${process.env.MESSAGING_DOMAIN}${process.env.MESSAGING_PATH_PUSH}`
}
