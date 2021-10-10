require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductModel = require('../models/product.model')(connection, Sequelize);

const listValues = async () => await ProductModel.findAll();

module.exports = {
  listValues
};