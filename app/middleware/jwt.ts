import { verify as JWTVerify } from 'jsonwebtoken';

// 不需验证的路径
const noPaths = [
  '/user/login'
];

function sendError(ctx: any, message?: string): boolean {
  ctx.status = 200;
  ctx.body = {
    status: 401,
    data: null,
    message: message || '用户信息验证失败'
  }
  return false;
}

module.exports = options => {
  return async function (ctx, next) {
    if (noPaths.indexOf(ctx.path) >= 0) {
      await next();
    } else {
      const token = ctx.header.token;
      if (token) {
        try {
          const config = ctx.app.config;
          const sign = JWTVerify(token, config.crypto.secret);
          const signToken = sign.token || '';
          const signOpenid = sign.openid
          if (!sign.uid || !signToken.includes(signOpenid)) {
            return sendError(ctx);
          } else {
            ctx.header.tokenOpenid = signOpenid;
            ctx.header.tokenUid = sign.uid;
          }
        } catch (err) {
          if (err.name == 'JsonWebTokenError') {
            return sendError(ctx);
          }
        }
        await next();
      } else {
        return sendError(ctx);
      }
    }
  }
}