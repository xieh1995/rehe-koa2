module.exports = (option = {}) => {
  const allowedMethods = async (ctx, next) => {
    ctx.success = function (data) {
      // ctx.type = option.type || 'json'
      ctx.body = {
        code: option.successCode || 200,
        msg: option.successMsg || 'success',
        result: data
      }
    }
    ctx.fail = function (msg, code) {
      // ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg || option.successMsg || 'fail'
      }
    }
    await next()
  }
  return allowedMethods
}
