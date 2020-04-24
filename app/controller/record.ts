import BaseController from './base';

export default class RecordController extends BaseController {
  constructor(ctx) {
    super(ctx, 'record');
  }
  async addRecord() {
    const rules = {
      title: 'string',
      content: 'string',
      taskId: 'number?',
      time: 'number?',
      label: 'string?',
    };
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let uid = this.ctx.header.tokenUid;
    params = this.filterParams(params, ['title', 'content', 'taskId', 'time', 'label']);
    params.uid = uid;
    let result = await this.service.record.insert(params);
    this.send(result);
  }
  async getRecordList() {
    const rules = {
      date: 'number?',
      pageNum: 'number',
      pageSize: 'number'
    }
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let uid = this.ctx.header.tokenUid;
    let result: any;
    if (params.date) {
      result = await this.service.record.getListByTime(params.date, uid);
    } else {
      result = await this.service.record.getListOrderByTime({
        limit: params.pageSize,
        offset: params.pageNum,
        uid: uid
      });
    }
    this.send(result);
  }
  async getMonthStatis() {
    const rules = {
      date: 'number',
    }
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let uid = this.ctx.header.tokenUid;
    let result = await this.service.record.getMonthStatis(uid, params.date);
    this.send(result);
  }
}
