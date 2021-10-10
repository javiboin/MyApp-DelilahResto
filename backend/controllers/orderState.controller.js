require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderStateModel = require('../models/orderState.model')(connection, Sequelize);

const listValues = async () => await orderStateModel.findAll();

module.exports = {
  listValues
};