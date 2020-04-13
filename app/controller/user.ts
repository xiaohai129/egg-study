import BaseController from './base';
import { Context } from 'egg';


export default class UserController extends BaseController {
  constructor(ctx: Context) {
    super(ctx);
    this.serviceName = 'user';
    this.tableName = 'user';
  }
  public async register() {
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
    // const result = await this.service.user.register(params);
    // this.send(result);
  }
}
