import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    mysql: {
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'hui5201314',
        database: 'mp_study',
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false
      }
    }
  };
  return config;
};
