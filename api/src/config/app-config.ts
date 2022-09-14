class Config {
  public static ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

  public static SERVERS = {
    http: {
      hostname: process.env.HOST || '0.0.0.0',
      port: Number(process.env.PORT) || 3001,
    },
  };
}

export default Config;
