const env = require('dotenv');
const path = require('path');

process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

const basePath = process.env.ENVIRONMENT === 'dev' ? './src/' : './dist/';

module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  migrationsRun: true,
  synchronize: false,
  entities: [`${basePath}domain/**/entities/*{.ts,.js}`],
  migrations: [`${basePath}infra/database/migrations/*{.ts,.js}`],
  cli: {
    entitiesDir: `${basePath}domain/**/entities`,
    migrationsDir: `${basePath}infra/database/migrations`,
  },
};
