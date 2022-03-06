require('dotenv').config()
const Sequelize = require('sequelize');

// Conexion con Sequelize a la Base de Datos, utilizando variables de entorno
const connection = new Sequelize(
  process.env.MYSQL_DELILAH_DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    "logging": false,
    define: {
      freezeTableName: true
    }
  });


  module.exports = connection;
