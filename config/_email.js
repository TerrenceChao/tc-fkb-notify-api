/**
 * [infrastructure-configuration]
 */

module.exports = {
  sender: process.env.EMAIL_SENDER,
  vendor: {
    ses: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    },
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_EMAIL_DOMAIN
    }
  },
  specify: process.env.EMAIL_VENDOR
}
