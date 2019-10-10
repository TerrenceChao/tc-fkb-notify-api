'use strict'

require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./src/route/_index')
var notifyRouter = require('./src/route/notify')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())

const ALLOW_REGION = process.env.ACCESS_CONTROL_ALLOW_ORIGIN
const ALLOW_METHODS = process.env.ACCESS_CONTROL_ALLOW_METHODS
const ALLOW_HEADERS = process.env.ACCESS_CONTROL_ALLOW_HEADERS

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', ALLOW_REGION)

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', ALLOW_METHODS)

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', ALLOW_HEADERS)

  /**
   * Set to true if you need the website to include cookies in the requests sent
   * to the API (e.g. in case you use sessions)
   */
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

var prefix = '/notification-service/api/v1'

app.use(`${prefix}`, indexRouter)
app.use(`${prefix}/notify`, notifyRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err) // res.render('error')
})

module.exports = app