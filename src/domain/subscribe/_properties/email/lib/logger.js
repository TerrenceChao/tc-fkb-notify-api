/**
 * @param {string} recipient 
 * @param {Object} content 
 */
exports.sendMail = function (recipient, content) {
  console.log(`\n暫時別真的寄送信件 ^_^a`, `假設寄送信件至:`, [recipient])
  console.log(`信件內容：`, content, `\n`)
}

/**
 * @param {Array} recipientList 
 * @param {Object} content 
 */
exports.sendMailList = function (recipientList, content) {
  console.log(`\n暫時別真的寄送信件 ^_^a`, `假設寄送信件給多個不同的收件人:`, recipientList)
  console.log(`信件內容：`, content, `\n`)
}