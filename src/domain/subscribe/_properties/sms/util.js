/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

var template = require('./template')
const C = require('../constant')
const SMS_CONTENT = {
  [C.SMS_REGISTRATION_FORM]: template.genRegisterContent,
  [C.SMS_VERIFICATION_FORM]: template.genVerifyContent
}


/**
 * generate sms content
 * @param {string} subject subjects of sms 
 * @param {Object} material sms's content material
 */
function genSMSContent(subject, material) {
  return SMS_CONTENT[subject](material)
}


module.exports = {
  genSMSContent,
}
