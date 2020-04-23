import { verify as JWTVerify } from 'jsonwebtoken';

// 不需验证的路径
const noPaths = [
  '/user/login'
];

function sendError(ctx: any, message?: string) {
  ctx.status = 200;
  ctx.body = {
    status: 401,
    data: null,
    message: message || '用户信息验证失败'
  }
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
          if (signToken.includes(signOpenid)) {
            ctx.header.tokenOpenid = signOpenid;
            ctx.header.tokenUid = sign.uid;
            await next();
          } else {
            sendError(ctx, 'token已失效');
          }
        } catch (err) {
          sendError(ctx);
        }
      } else {
        sendError(ctx);
      }
    }
  }
}