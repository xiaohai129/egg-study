import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586764374044_3932';

  // add your egg config in here
  config.middleware = [];

  config.onerror  = {
    all(err, ctx) {
      const body = {
        status: 10000,
        data: null,
        message: '未知错误'
      }
      ctx.set({
        "Content-Type": "application/json"
      })
      ctx.body = JSON.stringify(body);
      ctx.status = 500;
    }
  }

  config.validate = {
    convert: true
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
