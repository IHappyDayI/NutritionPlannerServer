module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'npdb',
      user:     'root',
      password: 'OoJXr1-50bd8OYkqBIEsVQZuKmnjPQEu0ELZeCzGyxeVKxXOPAL'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
