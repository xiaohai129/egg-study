import { Controller } from 'egg';

export default class BaseController extends Controller {
  protected serviceName: any;
  protected tableName: string;
  public async get() {
    const rules = {
      id: 'int'
    };
    let params = this.ctx.params;
    if (this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].get(this.tableName, params.id);
    if (result) {
      this.send({
        data: result
      })
    } else {
      this.send({
        message: '此用户不存在'
      });
    }
  }
  public async delete() {
    const rules = {
      id: 'int'
    };
    let params = this.ctx.params;
    if (this.validate(rules, params)) {
      return;
    }
    const result = this.service[this.serviceName].delete(this.tableName, params.id);
    this.send({
      data: result
    })
  }

  protected send(options: {status?: number, message?: string, data?: string } = {}) {
    this.ctx.body = {
      status: options.status || 200,
      data: options.data || '',
      message: options.message || ''
    };
    return;
  }
  
  protected sendError(options: {status?: number, message?: string, data?: string } = {}) {
    this.ctx.body = {
      status: options.status || 10000,
      data: options.data || '',
      message: options.message || '未知错误'
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
