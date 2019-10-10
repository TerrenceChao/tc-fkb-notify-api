const Validator = require('validatorjs')
const _ = require('lodash')

const RULES = {
  'category': `required|string|in:${process.env.CATEGORIES}`,
  'channels': `required|array`,
  'channels.*': `required|string|in:${process.env.CHANNELS}`,
  'sender': `present`,
  'receivers': `required|array`,
  'receivers.*.uid': `required_with:${process.env.RECEIVER_EXCEPTIONAL_CASE}|string`,
  'receivers.*.region': `required_with:${process.env.RECEIVER_EXCEPTIONAL_CASE}|string`,
  'packet': `required`,
  'packet.event': `required|string`,
  'packet.content': `required`,
}

function genValidateErr(req, validation) {
  let err = {
    data: {
      requestBody: req.body
    },
    meta: {
      msgCode: `900001`,
      msg: `request from folk-service causes error`,
      error: JSON.stringify(validation.errors.all())
    }
  }

  console.error(`\nvalidate error:`, validation.errors.all(), `\n`)

  return err
}


exports.validator = (req, res, next) => {
  res.locals.data = {}
  let validation = new Validator(req.body, RULES)
  validation.passes() ? next() : res.status(422).json(genValidateErr(req, validation))
}
