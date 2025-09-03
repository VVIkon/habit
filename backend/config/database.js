/**
 * Конфигурация подключения к PostgreSQL
 */
const { Pool, PoolConfig } = require('pg');
require('dotenv').config();
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const pool = new Pool(config);

module.exports = pool;
