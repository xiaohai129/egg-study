import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586764374044_3932';

  // add your egg config in here
  config.middleware = [
    'jwt',  //用户身份验证
  ];

  config.proxy = true;

  config.onerror = {
    all(err, ctx) {
      const body = {
        status: 10000,
        data: null,
        message: '未知错误'
      }
      ctx.set({
        "Content-Type": "application/json"
      })
      ctx.body = body;
      ctx.status = 500;
    }
  }

  config.validate = {
    convert: true
  }

  config.crypto = {
    secret: 'dulinhai'
  };

  config.mysql = {
    client: {
      host: '118.25.42.61',
      port: '3306',
      user: 'xh129',
      password: 'hui5201314',
      database: 'mp_study',
    },
    app: true,
    agent: false,
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    wxAppid: "wxb4e620b8740ac7b3",
    wxAppSecret: "598717b9080ccf9d3dc7ca09ba9edaa9"
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
