// http
exports.MESSAGING_HEADERS = {
  'content-type': 'application/json'
}
exports.MESSAGING_PUSH_URL = `${process.env.MESSAGING_DOMAIN}${process.env.MESSAGING_PATH_PUSH}`

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN
const FRONTEND_PATH_REGISTRATION = process.env.FRONTEND_PATH_REGISTRATION
const FRONTEND_PATH_RECOVER_BY_CODE = process.env.FRONTEND_PATH_RECOVER_BY_CODE
const FRONTEND_PATH_RECOVER_BY_PASSWORD = process.env.FRONTEND_PATH_RECOVER_BY_PASSWORD

exports.REGISTRATION_URL = `${FRONTEND_DOMAIN}${FRONTEND_PATH_REGISTRATION}`
exports.VERIFY_CODE_URL = `${FRONTEND_DOMAIN}${FRONTEND_PATH_RECOVER_BY_CODE}`
exports.VERIFY_BY_RESET_PASSWORD_URL = `${FRONTEND_DOMAIN}${FRONTEND_PATH_RECOVER_BY_PASSWORD}`

exports.RETRY_LIMIT = parseInt(process.env.RETRY_LIMIT) || 3
exports.DELAY = parseInt(process.env.DELAY) || 500


// common format
exports.INTERVAL = parseInt(process.env.INTERVAL) || 60

exports.CATEGORIES = process.env.CATEGORIES.split(',')

exports.ACCOUNT_IDENTITY = process.env.ACCOUNT_IDENTITY ?
  process.env.ACCOUNT_IDENTITY.split(',') : [
    'region',
    'uid',
  ]

exports.ACCOUNT_CONTACT_FIELDS = process.env.ACCOUNT_CONTACT_FIELDS ?
  process.env.ACCOUNT_CONTACT_FIELDS.split(',') : [
    'email',
    'phone',
    'device',
  ]


// email
// subjects of email
exports.REGISTRATION_EMAIL = process.env.ACCOUNT_EVENT_REGISTRATION
exports.VERIFICATION_EMAIL = process.env.ACCOUNT_EVENT_VALIDATE_ACCOUNT

// internail-search

// sms
// subjects of sms()
exports.REGISTRATION_SMS = process.env.ACCOUNT_EVENT_REGISTRATION
exports.VERIFICATION_SMS = process.env.ACCOUNT_EVENT_VALIDATE_ACCOUNT

// app-push

// web-push

// TODO: push
