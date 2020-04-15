import { Service } from 'egg';

export default class BaseService extends Service {
  json(data: any, isError: boolean=false): {status: number, message: string, data: any} {
    let message = '';
    let status = 200;
    if (isError) {
      status = 500;
      if (data.sqlState) {
        status = parseInt(data.sqlState);
      }
      if (data.message) {
        message = data.sqlMessage;
      }
      data = null;
    }
    return {
      status,
      message,
      data
    }
  }
  get(tableName: string, id: number) {
    return this.app.mysql.get(tableName, {id})
  }
  insert(tableName: string, params: {[key: string]: any}) {
    if (params.id) {
      delete params.id;
    }
    return this.app.mysql.insert(tableName, params);
  }
  detele(tableName: string, id: number) {
    return this.app.mysql.delete(tableName, {id})
  }
  update(tableName: string, params: {id: number, [key: string]: any}) {
    return this.app.mysql.update(tableName, params);
  }
}
