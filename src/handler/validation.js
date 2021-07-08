const joi = require('joi')

module.exports = (option = {}) => {
  const allowedMethods = async (ctx, next) => {
    const p = { ...ctx.request.query, ...ctx.request.body }
    const v = joi.object(option).options({ allowUnknown: true }).validate(p)
    if (v.error) {
      throw v.error
    }
    await next()
  }
  return allowedMethods
}
