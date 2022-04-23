import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'whatever123',
      database: 'base-database'
    },
    migrations: {
      tableName: "base_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'whatever123',
      database: 'base-database'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "base_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'whatever123',
      database: 'base-database'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "base_migrations"
    }
  }

};

export default config;

