require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);

const listValues = async () => await UserAddressModel.findAll();

module.exports = {
  listValues
};