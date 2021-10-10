require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const OrderModel = require('../models/order.model')(connection, Sequelize);

const listValues = async () => await OrderModel.findAll();

module.exports = {
  listValues
};