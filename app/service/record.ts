import BaseService from './base';

export default class UserService extends BaseService {
  constructor(cxt) {
    super(cxt, 'record');
  }
}
