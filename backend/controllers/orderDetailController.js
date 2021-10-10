require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

const listValues = async () => await orderDetailModel.findAll();

module.exports = {
  listValues
};