'use strict';

module.exports = {
  'dev': {
    'dialect': 'sqlite',
    'storage': './data/db.sqlite3'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'dialect': 'mysql',
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME
  }
};
