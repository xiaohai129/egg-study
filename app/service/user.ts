import BaseService from './base';
import UserModel from '../model/user';

export default class UserService extends BaseService {
  constructor(cxt) {
    super(cxt, 'user');
  }
  async register(user: UserModel) {
    let result = await this.insert(user);
    if (result.message.includes('openid')) {
      result.message = '此用户已注册';
    }
    return result;
  }
}
