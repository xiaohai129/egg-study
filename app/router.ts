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
  router.post('/record/list', controller.record.getList);

  // 学习记录标签
  router.post('/record/label', controller.recordLabel.add);
  router.put('/record/label', controller.recordLabel.edit);
  router.delete('/record/label/:id', controller.recordLabel.delete);
  router.post('/record/label/list', controller.recordLabel.getList);
  router.post('/record/label/uList', controller.recordLabel.getLabelsByUser);
  router.post('/record/label/iList', controller.recordLabel.getLabelsByIds);
};
