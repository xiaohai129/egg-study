import BaseService from './base';
import UserModel from '../model/user';

export default class UserService extends BaseService {
  constructor(cxt) {
    super(cxt, 'user');
  }
  async register(user: UserModel) {
    let result = await this.insert(user);
    return result;
  }
}
