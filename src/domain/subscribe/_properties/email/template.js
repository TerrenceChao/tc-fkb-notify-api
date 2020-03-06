const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const {
  DEFAULT_LANG,
  REGISTRATION_URL,
  VERIFY_CODE_URL,
  VERIFY_BY_RESET_PASSWORD_URL
} = require('../constant')

const registerTemplate = {}
const registerDir = path.join(__dirname, 'template_lang', 'register')
const registerFiles = fs.readdirSync(registerDir)
registerFiles.forEach(file => {
  const lang = file.replace('.js', '')
  registerTemplate[lang] = require(path.join(registerDir, file))
})

const verifyTemplate = {}
const verifyDir = path.join(__dirname, 'template_lang', 'verify')
const verifyFiles = fs.readdirSync(verifyDir)
verifyFiles.forEach(file => {
  const lang = file.replace('.js', '')
  verifyTemplate[lang] = require(path.join(verifyDir, file))
})

/**
 * generate registration material for sending email
 * @param {Object} material
 */
function genRegisterContent (material) {
  const m = material
  const lang = m.lang || DEFAULT_LANG
  const template = registerTemplate[lang]
  const params = [m.givenName, m.familyName, m.code, REGISTRATION_URL, m['verify-token'], m.expire, m.account.email]
  var content = {
    subject: template.content.subject,
    text: _.clone(template.content.text)
  }
  for (const [idx, value] of template.replacement.entries()) {
    content.text = content.text.replace(`{{${idx}}}`, params[value])
  }

  return content
}

/**
 * generate verification material for sending email
 * @param {Object} material
 */
function genVerifyContent (material) {
  const m = material
  const lang = m.lang || DEFAULT_LANG
  const template = verifyTemplate[lang]
  const params = [m.gender, m.givenName, m.familyName, m.code, VERIFY_CODE_URL, m['verify-token'], VERIFY_BY_RESET_PASSWORD_URL, m['verify-token'], m.expire]
  var content = {
    subject: template.content.subject,
    text: _.clone(template.content.text)
  }
  for (const [idx, value] of template.replacement.entries()) {
    if (typeof value === 'number') {
      content.text = content.text.replace(`{{${idx}}}`, params[value])
    } else {
      content.text = content.text.replace(`{{${idx}}}`, value(params))
    }
  }

  return content
}

module.exports = {
  genRegisterContent,
  genVerifyContent
}
