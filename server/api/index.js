const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/mood', require('./mood'))
router.use('/activity', require('./activity'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
