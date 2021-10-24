require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductModel = require('../models/product.model')(connection, Sequelize);

const listValues = async () => await ProductModel.findAll();

const listValuesRedis = async () => await ProductModel.findAll();

const createProduct = async (req) => {
  const newProduct = await ProductModel.build({
    name: req.body.name,
    price: req.body.price,
    pic: req.body.pic
  });

  const result = await newProduct.save();
  return result;
}

const updateProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.update({
    name: req.body.name,
    price: req.body.price,
    pic: req.body.pic
    },
    { where: { id: id_product } }
  );
  return result;
}

const deleteProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.destroy({
    where: { id: id_product }
  });
  return result;
}

const listProductById = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.findOne({ where: { id: id_product } });
  return result;
}

module.exports = {
  listValues,
  listValuesRedis,
  createProduct,
  updateProduct,
  deleteProduct,
  listProductById
};