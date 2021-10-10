require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const paymentMethodModel = require('../models/paymentMethod.model')(connection, Sequelize);

const listValues = async () => await paymentMethodModel.findAll();

module.exports = {
  listValues
};