require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserStateModel = require('../models/userStates.model')(connection, Sequelize);

const listValues = async () => await UserStateModel.findAll();

module.exports = {
  listValues
};