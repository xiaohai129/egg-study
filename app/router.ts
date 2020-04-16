import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 用户
  router.post('/user/register', controller.user.register);
  router.get('/user/:id', controller.user.get);
  router.put('/user', controller.user.modify);

  // 学习记录
  router.get('/record/:id', controller.record.get);
  router.post('/record', controller.record.add);
  router.put('/record', controller.record.edit);
};
