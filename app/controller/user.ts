import BaseController from './base';
import { Context } from 'egg';
import { sign as JWTSign } from 'jsonwebtoken';


export default class UserController extends BaseController {
  constructor(ctx: Context) {
    super(ctx, 'user');
  }
  async register() {
    const rules = {
      nickname: 'string',
      avatar: 'string',
      province: 'string?',
      city: 'string?',
      country: 'string?',
      gender: 'int?',
      account: 'string?',
      password: 'string?'
    };
    const params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    const openid = this.ctx.header.tokenOpenid;
    params.openid = openid;
    let result = await this.service.user.register(params);
    this.send(result);
  }
  // 修改用户信息
  async modify() {
    const rules = {
      id: 'number',
      nickname: 'string?',
      avatar: 'string?',
      province: 'string?',
      city: 'string?',
      country: 'string?',
      gender: 'int?'
    }
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    if (params.password) {
      this.send({
        status: this.ctx.dataStatus.fail,
        message: '此接口无法修改密码'
      });
      return;
    } else if (params.account) {
      this.send({
        status: this.ctx.dataStatus.fail,
        message: '账号无法修改'
      });
      return;
    }
    const result = await this.service.user.update(params);
    this.send(result);
  }

  async login() {
    const rules = {
      code: 'string'
    }
    const params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    const appid = this.config.wxAppid;
    const appSecret = this.config.wxAppSecret;
    const code = params.code;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    const result = await this.app.curl(url, {
      dataType: 'json',
    });
    if (result.status == 200) {
      const data = result.data;
      const openid = data.openid;
      const sessionKey = data.session_key;
      const token = JWTSign({
        openid,
        token: openid + sessionKey
      }, this.config.crypto.secret);
      let userdata = await this.service.user.get({
        openid: openid
      })
      let message = '';
      let userInfo: any = {};
      if (userdata.data) {
        userInfo = userdata.data;
      } else {
        message = '用户数据不存在，请先注册';
      }
      userInfo.token = token;
      this.send({
        data: userInfo,
        message
      });
    } else {
      this.send({
        message: '微信登录失败'
      }, true);
    }

  }
}
