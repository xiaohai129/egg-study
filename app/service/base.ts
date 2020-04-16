import { Service } from 'egg';

export default class BaseService extends Service {
  protected tableName: string;
  constructor(ctx:any, tableName: string) {
    super(ctx);
    this.tableName = tableName;
  }
  json(data: any, isError: boolean=false): {status: number, message: string, data: any} {
    let message = '';
    let status: number = this.ctx.dataStatus.success;
    if (isError) {
      status = this.ctx.dataStatus.databaseError;
      message = data.sqlMessage;
      data = null;
    }
    return {
      status,
      message,
      data
    }
  }
  get(id: number) {
    try {
      const result = this.app.mysql.get(this.tableName, {id});
      return this.json(result);
    } catch(err) {
      return this.json(err, true);
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
      return this.json(err, true);
    }
  }

  detele(id: number) {
    return this.app.mysql.delete(this.tableName, {id})
  }

  async update(params: {id: number, [key: string]: any}) {
    try {
      const result = await this.app.mysql.update(this.tableName, params);
      return this.json(result.changedRows);
    } catch(err) {
      return this.json(err, true);
    }
  }
}
