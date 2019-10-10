var express = require('express')
var router = express.Router()
var notify = require('../protocol/http/controller/notify')
var publishReq = require('../protocol/http/request/publishReq')
var publishRes = require('../protocol/http/response/publishRes')
// var subscribeReq = require('../protocol/http/request/subscribeReq')
// var subscribeRes = require('../protocol/http/response/subscribeRes')

router.post('/publish',
  publishReq.validator,
  notify.publish,
  publishRes.createdSuccess
)

// router.post('/subscribe',
//   subscribeReq.validator,
//   notify.subscribe,
//   subscribeRes.createdSuccess
// )

module.exports = router