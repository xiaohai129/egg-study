import BaseController from './base';

export default class RecordLabelController extends BaseController {
  constructor(ctx) {
    super(ctx, 'recordLabel');
  }
  async add() {
    const rules = {
      name: 'string',
      uid: 'id',
      color: 'string',
    };
    const params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let result = await this.service.recordLabel.insert(params);
    if (result.errno == 1062) {
      result.message = '此标签已存在';
    } else if (result.errno == 1452) {
      result.message = '此用户id不存在';
    }
    this.send(result);
  }

  async getLabelsByUser() {
    const rules = {
      uid: 'id'
    };
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    params.where = {
      uid: params.uid
    }
    await this.list(params);
  }

  async getLabelsByIds() {
    const rules = {
      ids: 'string'
    };
    let params = this.ctx.request.body;
    if (!this.validate(rules, params)) {
      return;
    }
    let ids = params.ids.split(',');
    params.where = {
      id: ids
    }
    await this.list(params);
  }
}
