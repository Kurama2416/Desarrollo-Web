
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql'
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'manglu_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql'
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql'
  }
};
