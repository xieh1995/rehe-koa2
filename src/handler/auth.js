const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = (option = {}) => {
  const auth = async function verify (ctx, next) {
    const token = ctx.header.authorization
    const data = await jwt.verify(token, config.SECRET)
    if (data) {
      // ctx.status = 200 //这里非常重要，只有设置了status，koa-router才识别请求正确继续进入路由
      await next()
    }
  }
  auth.unless = function (options = []) {
    const originalMiddleware = this
    return async function (ctx, next) {
      const y = options.some(function (p) {
        return (typeof p === 'string' && p === ctx.url) ||
          (p instanceof RegExp && !!p.exec(ctx.url))
      })
      if (y) {
        await next()
      } else {
        await originalMiddleware.call(this, ctx, next)
      }
    }
  }
  return auth
}
