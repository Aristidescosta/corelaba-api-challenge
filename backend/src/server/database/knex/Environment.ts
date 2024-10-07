/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Knex } from 'knex';
import path from 'path';

/* const databasePath = path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'); */

export const development: Knex.Config = {
  client: process.env.DATABASE_CLIENT,
  version: process.env.DATABASE_VERSION,
  connection: {
    host: process.env.LOCAL_DATABASE_HOST,
    port: Number(process.env.LOCAL_DATABASE_PORT || 5432),
    user: process.env.LOCAL_DATABASE_USER,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    database: process.env.LOCAL_DATABASE_DATABASE,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  }
};


export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
  client: "sqlite3"
};

export const production: Knex.Config = {
  client: process.env.DATABASE_CLIENT,
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },
  connection: {
    connectString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 5432),
    ssl: { rejectUnauthorized: false }
  }
};