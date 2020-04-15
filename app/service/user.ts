import BaseService from './base';
import UserModel from '../model/user';

export default class UserService extends BaseService {
  private tableName = 'user';
  async register(user: UserModel) {
    try {
      let result = await this.insert(this.tableName, user);
      if (result.insertId) {
        return this.json(result.insertId);
      }
    } catch(err) {
      let json = this.json(err, true);
      if (json.status === 23000) {
        json.status = 417;
        json.message = '此账号已注册';
      }
      return json;
    }
  }
}
