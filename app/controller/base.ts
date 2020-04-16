import { Controller } from 'egg';

export default class BaseController extends Controller {
  protected serviceName: any;
  constructor(ctx, serviceName: string) {
    super(ctx);
    this.serviceName = serviceName;
  }
  public async get() {
    const rules = {
      id: 'int'
    };
    let params = this.ctx.params;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].get(params.id);
    if (result) {
      this.send(result);
    } else {
      this.send({
        message: '此数据不存在'
      });
    }
  }
  public async delete() {
    const rules = {
      id: 'int'
    };
    let params = this.ctx.params;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = this.service[this.serviceName].delete(params.id);
    this.send(result);
  }
  public async edit() {
    const rules = {
      id: 'int'
    };
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].update(params);
    this.send(result);
  }

  protected send(options: {status?: number, message?: string, data?: string } = {}, isErr = false) {
    let status = 200;
    let message = '';
    if (isErr) {
      status = 10000;
      message = '未知错误';
    }
    this.ctx.set({
      "Content-Type": "application/json"
    });
    this.ctx.body = {
      status: options.status || status,
      data: options.data || null,
      message: options.message || message
    };
    return;
  }
  
  protected validate(rules: any, params: any, iSend: boolean = true): boolean {
    try {
      this.ctx.validate(rules, params)
      return true;
    } catch(err) {
      if (iSend) {
        this.send({
          message: err.message,
          data: err.errors,
          status: 422
        });
      } else {
        throw err;
      }
      return false;
    }
  }
}
