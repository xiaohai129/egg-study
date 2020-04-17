import { Service } from 'egg';

interface dataJson {
  status: number,
  message: string,
  errno?: number,
  data: any
}

export default class BaseService extends Service {
  protected tableName: string;
  constructor(ctx:any, tableName: string) {
    super(ctx);
    this.tableName = tableName;
  }
  json(data: any, message: string = ''): dataJson {
    return {
      status: this.ctx.dataStatus.success,
      message,
      data
    }
  }
  jsonError(err: any, message?: string): dataJson {
    let sqlMessage = '';
    if (err && err.sqlMessage) {
      sqlMessage = err.sqlMessage;
    }
    return {
      status: this.ctx.dataStatus.databaseError,
      errno: err.errno,
      message: message || sqlMessage,
      data: null
    }
  }
  async get(id: number) {
    try {
      const result = await this.app.mysql.get(this.tableName, {id});
      if (result) {
        return this.json(result);
      } else {
        return this.json(result, '数据不存在');
      }
    } catch(err) {
      return this.jsonError(err);
    }
  }

  async getList(options: {limit: number, offset: number}){
    let defaultOptions: any = {
      limit: 10,
      offset: 0
    };
    defaultOptions = Object.assign(defaultOptions, options);
    try {
      const result = await this.app.mysql.select(this.tableName, defaultOptions);
      let countOption = {};
      let total = 0
      if (defaultOptions.where) {
        total = await this.count(defaultOptions.where);
      }
      const data = {
        total: total,
        list: result
      }
      if (result.length) {
        return this.json(data);
      } else {
        return this.json(data, '没有列表数据');
      }
    } catch(err) {
      return this.jsonError(err);
    }
  }

  async count(options={}) {
    try {
      const count = await this.app.mysql.count(this.tableName, options);
      return count;
    } catch(err) {
      return this.jsonError(err);
    }
  }

  async insert(params: {[key: string]: any}) {
    if (params.id) {
      delete params.id;
    }
    try {
      const result = await this.app.mysql.insert(this.tableName, params);
      return this.json(result.insertId);
    } catch(err) {
      return this.jsonError(err);
    }
  }

  async delete(id: number) {
    try {
      await this.app.mysql.delete(this.tableName, {id});
      return this.json(null, '数据删除成功');
    } catch(err) {
      return this.jsonError(err);
    }
  }

  async update(params: {id: number, [key: string]: any}) {
    try {
      const result = await this.app.mysql.update(this.tableName, params);
      return this.json(result.changedRows);
    } catch(err) {
      return this.jsonError(err);
    }
  }
}
