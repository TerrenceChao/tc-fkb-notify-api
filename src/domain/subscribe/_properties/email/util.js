/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

var template = require('./template')
const C = require('../constant')

const EMAIL_CONTENT = {
  [C.REGISTRATION_EMAIL]: template.genRegisterContent,
  [C.VERIFICATION_EMAIL]: template.genVerifyContent
}


var config = require('config').get('email')
var mailgun = require('./lib/mailgun')
var ses = require('./lib/ses')
var logger = require('./lib/logger')

const VENDOR = {
  mailgun,
  ses,
  logger,
}



/**
 * generate email content
 * @param {string} subject subjects of email 
 * @param {Object} material email's content material
 */
function genEmailContent(subject, material) {
  return EMAIL_CONTENT[subject](material)
}

/**
 * 
 * @param {string} to 
 * @param {Object} content 
 */
function sendMail(to, content) {
  VENDOR[config.specify].sendMail(to, content)
}

/**
 * TODO: 在多筆資料庫紀錄中，區分不同的信件內容，並針對相同內容的多個收件人用 bcc 方式統一寄送同一封信。
 * @param {array} recordList db columns
 */
function sendMailList(recordList) {
  
}


module.exports = {
  genEmailContent,
  sendMail,
  sendMailList,
}
