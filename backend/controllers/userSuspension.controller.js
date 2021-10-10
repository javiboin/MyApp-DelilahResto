require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserSuspensionModel = require('../models/userSuspension.model')(connection, Sequelize);

const listValues = async () => await UserSuspensionModel.findAll();

module.exports = {
  listValues
};