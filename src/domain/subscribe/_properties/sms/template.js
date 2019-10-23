/**
 * generate registration content as specified language: [zh-tw]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 *
 * [NOTE]
 * lang: 'zh-tw' 注意用中文的 template 是否會變成亂碼:
 * @param {Object} content
 */
function genRegisterInZhTw (content) {
  var c = content
  return `嗨， ${c.familyName} ${c.givenName}\n

    感謝您的註冊！ 請在登入畫面中通過輸入以下驗證碼來完成註冊：
  
    ${c.code}
    
     祝旅途愉快！
    Travemorer`
}

/**
 * generate registration content as specified language: [en]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 * @param {Object} content
 */
function genRegisterInEn (content) {
  var c = content
  return `Hi, ${c.givenName} ${c.familyName}\n

    Thank you for your registration! Please complete the registration by entering the following verification code on the login page:

    ${c.code}
    
    Happy traveling!
    Travemorer`
}

/**
 * generate registration content for sending email
 * @param {Object} content
 */
function genRegisterContent (content) {
  var lang = content.lang
  var registerContent = {
    'zh-tw': genRegisterInZhTw,
    'en': genRegisterInEn
  }

  return registerContent[lang](content)
}

/**
 * generate verification content as specified language: [zh-tw]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 *
 * [NOTE]
 * lang: 'zh-tw' 注意用中文的 template 是否會變成亂碼:
 * @param {Object} content
 */
function genVerifyContentInZhTw (content) {
  var c = content
  return `親愛的 ${c.familyName} ${c.givenName} ${c.gender === 'male' ? '先生' : '女士'} 您好\n
    我們已收到你的 Fakebook 密碼重設要求。
    輸入以下密碼重設確認碼：
    ${c.code}`
}

/**
 * generate verification content as specified language: [en]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 * @param {Object} content
 */
function genVerifyContentInEn (content) {
  var c = content
  return `Dear ${c.gender === 'male' ? 'Mr.' : 'Ms.'} ${c.givenName} ${c.familyName}\n
    We have received your password reset requirement.
    Please enter the following verify code to reset:
    ${c.code}`
}

/**
 * generate verification content for sending SMS
 * @param {Object} content
 */
function genVerifyContent (content) {
  var lang = content.lang
  var verifyContent = {
    'zh-tw': genVerifyContentInZhTw,
    'en': genVerifyContentInEn
  }

  return verifyContent[lang](content)
}

module.exports = {
  genRegisterContent,
  genVerifyContent
}
