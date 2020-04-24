import BaseService from './base';

export default class RecordLabelService extends BaseService {
  constructor(cxt) {
    super(cxt, 'record_label');
  }
  async getUserLabels(uid: number) {
    return await this.getList({
      limit: 0,
      offset: 0,
      where: {
        uid
      },
      columns: [
        'id',
        'name',
        'color'
      ]
    })
  }
}
