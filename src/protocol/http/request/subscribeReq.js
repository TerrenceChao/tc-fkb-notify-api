exports.validator = (req, res, next) => {
  res.locals.data = {}
  next()
}