import BaseService from './base';
import { formatDate } from '../utils';

export default class RecordService extends BaseService {
  constructor(cxt) {
    super(cxt, 'record');
  }

  async handleRecordLabel(uid, records) {
    let result = await this.service.recordLabel.getUserLabels(uid);
    let labels = result.data.list;
    let hLabels = {};
    for (let i in labels) {
      let label = labels[i];
      hLabels[label.id] = label;
    }
    for (let i in records) {
      let record = records[i];
      let ls = record.label;
      if (!ls) {
        continue;
      }
      let label: any = [];
      ls = ls.split(',');
      for (let j in ls) {
        let item = hLabels[ls[j]];
        if (item) {
          label.push(item);
        }
      }
      record.label = label;
    }
    return records;
  }

  async getListByTime(date: string, uid: number) {
    let dateStr = formatDate(date, 'yyyy-MM-dd');
    let result = await this.query(`select id, title, content, DATE_FORMAT(time, "%Y-%m-%d") as date, DATE_FORMAT(time, "%H:%i") as time, label from record where DATE_FORMAT(time, "%Y-%m-%d") = '${dateStr}' and uid = ${uid}`);
    const records = await this.handleRecordLabel(uid, result.data);
    return this.json(records);
  }
  async getListOrderByTime(params: { limit: number, offset: number, uid: number }) {
    let count = await this.count({
      uid: params.uid
    });
    params.offset = params.offset * params.limit;
    let result = await this.query(`select id, title, content, DATE_FORMAT(time, "%Y-%m-%d") as date, DATE_FORMAT(time, "%H:%i") as time, label from record where uid = ${params.uid} order by time limit ${params.offset},${params.limit}`);
    const records = await this.handleRecordLabel(params.uid, result.data);
    return this.json({
      total: count,
      list: records
    });
  }
  async getMonthStatis(uid, date) {
    let dateStr = formatDate(date, 'yyyy-MM');
    let result = await this.query(`SELECT DATE_FORMAT(time,'%d') as day, COUNT(id) as num from record WHERE uid = ? and DATE_FORMAT(time,'%Y-%m') = ? GROUP BY day`, [uid, dateStr])
    return result;
  }
}
