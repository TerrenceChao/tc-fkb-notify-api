/**
 * [NOTE]
 * 關於第三方服務的反應時間無法掌握，所以除了 [web-push,internal-search] 以外,
 * 其他串接第三方服務的不須等待 callback
 */

var apiKey = require('../constant').EMAIL_API_KEY
var domain = require('../constant').EMAIL_DOMAIN
var maingun = require('mailgun-js')({ apiKey, domain })
var template = require('./template')
const C = require('../constant')
const EMAIL_CONTENT = {
  [C.REGISTRATION_EMAIL]: template.genRegisterContent,
  [C.VERIFICATION_EMAIL]: template.genVerifyContent
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
  const info = {
    from: `no-reply@system.com`,
    to,
    subject: content.subject,
    text: content.text
  }

  // maingun.messages().send(info, (err, body) => {
  //   if (err) {
  //     console.error(`Error: ${__dirname}.${arguments.callee.name}\n`, err)
  //     return
  //   }

  //   console.log(`to:`, info.to)
  //   console.log(`response:`, body)
  // })
  console.log([`暫時別真的寄送信件 ^_^a`, `假設信件已發送至:`, to])
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
