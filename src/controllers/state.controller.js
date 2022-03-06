require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const EstadoModel = require('../models/state.model')(connection, Sequelize);

// MOSTART TODOS LOS ESTADOS
const listStates = async () => await EstadoModel.findAll();

module.exports = {
  listStates
};