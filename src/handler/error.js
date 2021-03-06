// eslint-disable-next-line no-unused-vars
const { BusinessError, HttpError } = require('../models/error')

module.exports = async (ctx, next) => {
  return next().catch((err) => {
    console.log(err)
    ctx.fail(err.message)
  })
}
