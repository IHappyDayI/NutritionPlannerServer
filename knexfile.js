module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'npdb',
      user:     'root',
      password: 'OoJXr1-50bd8OYkqBIEsVQZuKmnjPQEu0ELZeCzGyxeVKxXOPAL'
    },
    debug: false,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
