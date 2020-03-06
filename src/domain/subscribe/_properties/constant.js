const config = require('config')

/**
 * [business-logic]
 */
// common
exports.CATEGORIES = process.env.CATEGORIES.split(',')
exports.ACCOUNT_IDENTITY = process.env.ACCOUNT_IDENTITY ?
  process.env.ACCOUNT_IDENTITY.split(',') : [
    'region',
    'uid'
  ]
exports.ACCOUNT_CONTACT_FIELDS = process.env.ACCOUNT_CONTACT_FIELDS ?
  process.env.ACCOUNT_CONTACT_FIELDS.split(',') : [
    'email',
    'phone',
    'device'
  ]

// subjects/events
exports.DEFAULT_LANG = process.env.LANG
// (email)
exports.EMAIL_REGISTRATION_FORM = process.env.ACCOUNT_EVENT_REGISTRATION
exports.EMAIL_VERIFICATION_FORM = process.env.ACCOUNT_EVENT_VALIDATE_ACCOUNT
// (sms)
exports.SMS_REGISTRATION_FORM = process.env.ACCOUNT_EVENT_REGISTRATION
exports.SMS_VERIFICATION_FORM = process.env.ACCOUNT_EVENT_VALIDATE_ACCOUNT
// (internal-search)
exports.SEARCH_EVENT_REGISTRATION = process.env.ACCOUNT_EVENT_REGISTRATION
exports.SEARCH_EVENT_UPDATE_PUBLIC_INFO = process.env.SETTING_EVENT_UPDATE_PUBLIC_INFO

// replaceable content elements
exports.REGISTRATION_URL = config.frontend.registrationUrl
exports.VERIFY_CODE_URL = config.frontend.verifyCodeUrl
exports.VERIFY_BY_RESET_PASSWORD_URL = config.frontend.verifyByResetPasswordUrl

/**
 * [infrastructure-configuration]
 */
// common
exports.HEADERS = config.app.headers
exports.RETRY_LIMIT = config.app.retryLimit
exports.DELAY = config.app.delay
exports.INTERVAL = config.app.interval

// app-push & web-push
exports.MESSAGING_PUSH_URL = config.message.pushUrl

// email
exports.EMAIL_SENDER = config.email.sender
exports.MAILGUN_CONFIG = config.email.vendor.mailgun
exports.EMAIL_VENDOR = config.email.specify

// internail-search
exports.SEARCH_HOST = config.search.vendor[config.search.specify].host

// sms
// TODO: sms constant params
