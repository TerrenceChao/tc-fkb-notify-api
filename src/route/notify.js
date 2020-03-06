var express = require('express')
var router = express.Router()
var notify = require('../protocol/http/controller/notify')
var publishReq = require('../protocol/http/request/publishReq')
var publishRes = require('../protocol/http/response/publishRes')

router.post('/publish',
  publishReq.validator,
  notify.publish,
  publishRes.createdSuccess,
  publishRes.createdFail
)

module.exports = router
