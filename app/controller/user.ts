import BaseController from './base';
import { Context } from 'egg';


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
}
