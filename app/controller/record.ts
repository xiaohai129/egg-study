import BaseController from './base';

export default class RecordController extends BaseController {
  constructor(ctx) {
    super(ctx, 'record');
  }
  async add() {
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
    params = this.filterParams(params, ['title', 'content', 'taskId', 'time', 'label']);
    let result = await this.service.record.insert(params);
    this.send(result);
  }
}
