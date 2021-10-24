require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const PagoModel = require('../models/payment.model')(connection, Sequelize);

const listPayments = async () => await PagoModel.findAll();

module.exports = {
  listPayments
};