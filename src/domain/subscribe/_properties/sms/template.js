const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const { DEFAULT_LANG } = require('../constant')

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
  const params = [m.givenName, m.familyName, m.code]
  var content = _.clone(template.content)

  for (const [idx, value] of template.replacement.entries()) {
    content = content.replace(`{{${idx}}}`, params[value])
  }

  return content
}

/**
 * generate verification material for sending SMS
 * @param {Object} material
 */
function genVerifyContent (material) {
  const m = material
  const lang = m.lang || DEFAULT_LANG
  const template = verifyTemplate[lang]
  const params = [m.gender, m.givenName, m.familyName, m.code]
  var content = _.clone(template.content)
  for (const [idx, value] of template.replacement.entries()) {
    if (typeof value === 'number') {
      content = content.replace(`{{${idx}}}`, params[value])
    } else {
      content = content.replace(`{{${idx}}}`, value(params))
    }
  }

  return content
}

module.exports = {
  genRegisterContent,
  genVerifyContent
}
