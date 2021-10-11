require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductModel = require('../models/product.model')(connection, Sequelize);

const listValues = async () => await ProductModel.findAll();

const createProduct = async (req) => {
  const newProduct = await ProductModel.build({
    name: req.body.name,
    price: req.body.id_user,
    pic: req.body.pic
  });

  const result = await newProduct.save();
  return result;
}

module.exports = {
  listValues,
  createProduct
};