function success (req, res, next) {
  res.locals.meta = res.locals.meta || {
    msgCode: '100000',
    msg: 'message published'
  }

  res.json(res.locals)
}

function createdSuccess (req, res, next) {
  res.locals.meta = res.locals.meta || {
    msgCode: '100000',
    msg: 'message published'
  }

  res.status(201).json(res.locals)
}

function createdFail (err, req, res, next) {
  res.locals.meta = res.locals.meta || {
    msgCode: '999999',
    msg: err.message
  }

  res.status(500).json(res.locals)
}

module.exports = {
  success,
  createdSuccess,
  createdFail
}
