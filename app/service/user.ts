import BaseService from './base';
import UserModel from '../model/user';

export default class UserService extends BaseService {
  register(user: UserModel) {
    console.log(user);
  }
}
