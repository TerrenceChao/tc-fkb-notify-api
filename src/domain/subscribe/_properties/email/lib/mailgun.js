const emailConfig = require('config').get('email')
const mailgun = require('mailgun-js')(emailConfig.vendor.mailgun)

/**
 * 
 * @param {string} type to,cc,bcc
 * @param {string} addresses mail1,mail2,...etc
 * @param {Object} content 
 */
function mailing(type, addresses, content) {
  const info = {
    from: emailConfig.sender,
    [type]: addresses,
    subject: content.subject,
    text: content.text
  }

  mailgun.messages().send(info, (err, body) => {
    if (err) {
      console.error(`Error: ${__dirname}.${arguments.callee.name}\n`, err.message)
      return
    }

    console.log(`addresses:`, addresses)
    console.log(`response:`, body)
  })  
}



/**
 * @param {string} recipient 
 * @param {Object} content 
 */
exports.sendMail = function (recipient, content) {
  mailing('to', recipient, content)
}

/**
 * @param {Array} recipientList 
 * @param {Object} content 
 */
exports.sendMailList = function (recipientList, content) {
  mailing('bcc', recipientList.join(), content)
}
