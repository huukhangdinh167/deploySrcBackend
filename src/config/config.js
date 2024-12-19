// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "sourcedb",
//     "host": "127.0.0.1",
//     "dialect": "mysql",
//     "define": {
//       "freezeTableName": true
//     },
//     "logging": false
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }




const fs = require('fs');
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    // password: DB_PASSWORD,
    // database: DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "sourcedb",
    dialect: "mysql",
    // define: {
    //   freezeTableName: true
    // },
    logging: false,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10,
    connectTimeout: 60000,
    queueLimit: 0,
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, "../../ca.pem"))
    }
  },
  test: {
    username: process.env.DB_USER,
    // password: DB_PASSWORD,
    // database: DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "sourcedb",
    dialect: "mysql",
    // define: {
    //   freezeTableName: true
    // },
    logging: false,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10,
    connectTimeout: 60000,
    queueLimit: 0,
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, "../../ca.pem"))
    }
  },
  production: {
    username: process.env.DB_USER,
    // password: DB_PASSWORD,
    // database: DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "sourcedb",
    dialect: "mysql",
    // define: {
    //   freezeTableName: true
    // },
    logging: false,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10,
    connectTimeout: 60000,
    queueLimit: 0,
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, "../../ca.pem"))
    }
  }
};
