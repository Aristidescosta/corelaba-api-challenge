import dotenv from 'dotenv';
import path from 'path';
import { development, production, test } from './src/server/database/knex/Environment';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const environment = process.env.NODE_ENV || 'development';

const config = {
  development,
  production,
  test,
};

module.exports = config[environment as keyof typeof config];
