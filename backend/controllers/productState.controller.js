require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductStateModel = require('../models/productState.model')(connection, Sequelize);

const listValues = async () => await ProductStateModel.findAll();

module.exports = {
  listValues
};