require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductStateModel = require('../models/productState.model')(connection, Sequelize);

const listValues = async () => await ProductStateModel.findAll();

const createProductState = async (req) => {
  const newProductState = await ProductStateModel.build({
    name: req.body.name
  });

  const result = await newProductState.save();
  return result;
}

module.exports = {
  listValues,
  createProductState
};