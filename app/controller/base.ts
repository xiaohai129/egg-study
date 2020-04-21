import { Controller } from 'egg';

export default class BaseController extends Controller {
  protected serviceName: any;
  constructor(ctx, serviceName: string) {
    super(ctx);
    this.serviceName = serviceName;
  }
  async get() {
    const rules = {
      id: 'id'
    };
    let params = this.ctx.params;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].get({id: params.id});
    this.send(result);
  }
  async delete() {
    const rules = {
      id: 'id'
    };
    let params = this.ctx.params;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].delete(params.id);
    this.send(result);
  }
  async edit() {
    const rules = {
      id: 'id'
    };
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    const result = await this.service[this.serviceName].update(params);
    this.send(result);
  }
  async list(params?: any) {
    const rules = {
      pageNum: 'number',
      pageSize: 'number'
    }
    if (!params) {
      params = this.ctx.request.body;
    }
    if (!this.validate(rules, params)) {
      return;
    }
    params.limit = params.pageSize;
    params.offset = params.pageNum;
    const result = await this.service[this.serviceName].getList(params);
    this.send(result);
  }

  async getList() {
    await this.list();
  }

  protected send(options: {status?: number, message?: string, data?: any } = {}, isErr = false) {
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
  protected filterParams(params: object, filter: string[]): object {
    let fparams = {};
    for (let i in filter) {
      let key = filter[i];
      let p = params[key];
      if (p) {
        fparams[key] = p;
      }
    }
    return fparams
  }
}
