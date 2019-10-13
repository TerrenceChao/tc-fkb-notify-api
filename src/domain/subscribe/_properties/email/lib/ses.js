'use strict'

const aws = require('aws-sdk')
const emailConfig = require('config').get('email')
aws.config.loadFromPath(`${__dirname}/config.json`)

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the 
// ConfigurationSetName : CONFIGURATION_SET argument below.
const CONFIGURATION_SET = 'ConfigSet'

// The HTML body of the email.
const BODY_HTML = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`


// The character encoding for the email.
const CHARSET = 'UTF-8'

// Create a new SES object. 
var ses = new aws.SES()

exports.sendMail = function (to, content) {
  var info = { 
    Source: emailConfig.sender, 
    Destination: { 
      ToAddresses: to.split(','),
    },
    Message: {
      Subject: {
        Data: content.subject,
        Charset: CHARSET
      },
      Body: {
        Text: {
          Data: content.text,
          Charset: CHARSET 
        },
        // Html: {
        //   Data: BODY_HTML,
        //   Charset: CHARSET
        // }
      }
    },
    // ConfigurationSetName: CONFIGURATION_SET
  }

  ses.sendEmail(info, function(err, body) {
    // If something goes wrong, print an error message.
    if(err) {
      console.error(`Error: ${__dirname}\n`, err.message)
      return
    }

    console.log(`to:`, to)
    console.log("Email sent! Message ID: ", body.MessageId)
  })
}