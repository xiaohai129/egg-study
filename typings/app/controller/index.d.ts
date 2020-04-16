// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportRecord from '../../../app/controller/record';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    record: ExportRecord;
    user: ExportUser;
  }
}
