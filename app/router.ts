import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/user/register', controller.user.register);
  router.get('/user/:id', controller.user.get);
  router.delete('/user/:id', controller.user.delete);
};
