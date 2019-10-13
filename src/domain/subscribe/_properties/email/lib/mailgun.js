const emailConfig = require('config').get('email')
const mailgun = require('mailgun-js')(emailConfig.vendor.mailgun)

exports.sendMail = function (to, content) {
  const info = {
    from: emailConfig.sender,
    to,
    subject: content.subject,
    text: content.text
  }
  
  mailgun.messages().send(info, (err, body) => {
    if (err) {
      console.error(`Error: ${__dirname}.${arguments.callee.name}\n`, err.message)
      return
    }

    console.log(`to:`, to)
    console.log(`response:`, body)
  })  
}