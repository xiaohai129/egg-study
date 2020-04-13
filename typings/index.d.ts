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

declare module 'egg' {
  interface Application {
    mysql: Mysql,
    returnData: (ctx: Context, options?: {data?: any, msg?: string, status?: number}) => {}
  }
}