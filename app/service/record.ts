import BaseService from './base';
import { formatDate } from '../utils';

export default class RecordService extends BaseService {
  constructor(cxt) {
    super(cxt, 'record');
  }
  async getListByTime(date: string, uid: string) {
    let dateStr = formatDate(date, 'yyyy-MM-dd');
    let count = await this.count();
    let result = await this.query(`select id, title, content, DATE_FORMAT(time, "%Y-%m-%d") as date, DATE_FORMAT(time, "%H:%i") as time, label from record where DATE_FORMAT(time, "%Y-%m-%d") = '${dateStr}' and uid = ${uid}`);
    return this.json({
      total: count,
      list: result.data
    });
  }
  async getListOrderByTime(params: { limit: number, offset: number, uid: string }) {
    let count = await this.count();
    let result = await this.query(`select id, title, content, DATE_FORMAT(time, "%Y-%m-%d") as date, DATE_FORMAT(time, "%H:%i") as time, label from record where uid = ${params.uid} order by time`);
    return this.json({
      total: count,
      list: result.data
    });
  }
}
