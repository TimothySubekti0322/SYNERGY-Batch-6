import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection:
      "postgres://synergy_ch_8_server:NSYM8S0vV1ucTLE@app-server-db.flycast:5432/synergy_ch_8_server?sslmode=disable",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection:
      "postgres://synergy_ch_8_server:NSYM8S0vV1ucTLE@app-server-db.flycast:5432/synergy_ch_8_server?sslmode=disable",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection:
      "postgres://synergy_ch_8_server:NSYM8S0vV1ucTLE@app-server-db.flycast:5432/synergy_ch_8_server?sslmode=disable",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
