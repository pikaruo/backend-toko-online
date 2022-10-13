// lib doenv
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_DATABASE_DEV,
    "host": process.env.DB_HOST_DEV,
    "port": process.env.PORT_DEV,
    "dialect": 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    }
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_DATABASE_TEST,
    "host": process.env.DB_HOST_TEST,
    "port": process.env.PORT_TEST,
    "dialect": 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    }
  },
  "production": {
    "username": process.env.DB_USERNAME_PRO,
    "password": process.env.DB_PASSWORD_PRO,
    "database": process.env.DB_DATABASE_PRO,
    "host": process.env.DB_HOST_PRO,
    "port": process.env.PORT_PRO,
    "dialect": 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    }
  }
}