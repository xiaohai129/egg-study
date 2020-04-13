import { Service } from 'egg';

export default class BaseService extends Service {
  send(data: any, isError: boolean=false): {status: number, message: string, data: any} {
    let message = '';
    let status = 200;
    if (isError) {

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
  detele(tableName: string, id: number) {
    return this.app.mysql.delete(tableName, {id})
  }
}
