import 'egg';

interface Mysql {
  query(sql: string, values?: any)
  queryOne(sql: string, values?: any)
  select(table: string, options?: any): []
  get(table: string, where: any, options?: any)
  insert(table: string, row: any, options?: any)
  update(table: string, row: any, options?: any)
  updateRows(table: string, options?: any)
  delete(table: string, where?: any)
  count(table: string, where?: any)
  beginTransaction(): {rollback()}
}

interface DataStatus {
  unknownError: 10000,
  databaseError: 20000,
  unauthorized: 401,
  unfind: 404,
  success: 200,
  fail: 417,
  error: 500,
  paramError: 422
}
declare module 'egg' {
  interface Application {
    mysql: Mysql
  }
  interface Context {
    dataStatus: DataStatus
  }
}