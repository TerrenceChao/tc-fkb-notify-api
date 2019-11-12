const {
  REGISTRATION_URL,
  VERIFY_CODE_URL,
  VERIFY_BY_RESET_PASSWORD_URL,
  DEFAULT_LANG
} = require('../constant')

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
  return {
    subject: `請驗證您的 Travmory 帳戶`,
    text: `嗨， ${c.familyName} ${c.givenName}\n

    感謝您的註冊！ 請通過輸入以下驗證碼來確認您的電子郵件地址：
  
    ${c.code}
    
    或者，點擊下面的鏈接。 
    
    ${REGISTRATION_URL}?token=${c['verify-token']}&code=${c.code}
    
    如果您沒有註冊 Travmory 帳戶，請忽略此電子郵件。
    
     祝旅途愉快！
    Travemorer`
  }
}

/**
 * generate registration content as specified language: [en]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 * @param {Object} content
 */
function genRegisterInEn (content) {
  var c = content
  return {
    subject: `Please verify your Travmory account`,
    text: `Hi, ${c.givenName} ${c.familyName}\n

    Thanks for your registration! Please confirm your email address by enter the following verify code:
  
    ${c.code}
    
    Or, clicking on the link below. 
    
    ${REGISTRATION_URL}?token=${c['verify-token']}&code=${c.code}
    
    If you did not sign up for a Travmory account please disregard this email.
    
    Happy traveling!
    Travemorer`
  }
}

/**
 * generate registration content for sending email
 * @param {Object} content
 */
function genRegisterContent (content) {
  var lang = content.lang || DEFAULT_LANG
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
  return {
    subject: `請驗證您的 Travmory 帳戶`,
    text: `親愛的 ${c.familyName}${c.givenName} ${c.gender === 'male' ? '先生' : '女士'} 您好\n
    我們已收到你的密碼重設要求。
    請輸入以下驗證碼進行更改：

      ${c.code} (url-link:${VERIFY_CODE_URL}?token=${c['verify-token']})


    你也可以改為直接變更密碼。

      url-link:${VERIFY_BY_RESET_PASSWORD_URL}?token=${c['verify-token']}&reset=${c.reset}


    你並沒有要求更改密碼？
    如果你並未要求新密碼， url-link:請通知我們。`
  }
}

/**
 * generate verification content as specified language: [en]
 * content includes 'region', 'lang', 'givenName', 'familyName', 'gender'
 * @param {Object} content
 */
function genVerifyContentInEn (content) {
  var c = content
  return {
    subject: `Please verify your Travmory account`,
    text: `Dear ${c.gender === 'male' ? 'Mr.' : 'Ms.'} ${c.givenName} ${c.familyName}\n
    We have received your password-change requirement.
    Please enter the following verify code to change:

      ${c.code} (url-link:${VERIFY_CODE_URL}?token=${c['verify-token']})


    you can change password directly instead of above.

      url-link:${VERIFY_BY_RESET_PASSWORD_URL}?token=${c['verify-token']}&reset=${c.reset}


    Have you never requested for password-change?
    If you have not requested a new password, url-link: please let us know.`
  }
}

/**
 * generate verification content for sending email
 * @param {Object} content
 */
function genVerifyContent (content) {
  var lang = content.lang || DEFAULT_LANG
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
