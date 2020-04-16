import BaseController from './base';

export default class RecordController extends BaseController {
  constructor(ctx) {
    super(ctx, 'record');
  }
  async add() {
    const rules = {
      title: 'string',
      content: 'string',
      time: 'number?',
      label: 'string?',
    };
    const params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let result = await this.service.record.insert(params);
    this.send(result);
  }
}
