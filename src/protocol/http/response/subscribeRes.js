function success (req, res, next) {
  res.locals.meta = res.locals.meta || {
    msgCode: '100000',
    msg: arguments.callee.name
  }

  res.json(res.locals)
}

function createdSuccess (req, res, next) {
  res.locals.meta = res.locals.meta || {
    msgCode: '100000',
    msg: arguments.callee.name
  }

  res.status(201).json(res.locals)
}

module.exports = {
  success,
  createdSuccess
}