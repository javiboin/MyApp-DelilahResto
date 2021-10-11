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

const updateProductState = async (req) => {
  const id_product_state = parseInt(req.params.id);
  const result = await ProductStateModel.update({
    name: req.body.name
    },
    { where: { id: id_product_state } }
  );
  return result;
}

const deleteProductState = async (req) => {
  const id_product_state = parseInt(req.params.id);
  const result = await ProductStateModel.destroy({
    where: { id: id_product_state }
  });
  return result;
}

const listProductStateById = async (req) => {
  const id_product_state = parseInt(req.params.id);
  const result = await ProductStateModel.findOne({ where: { id: id_product_state } });
  return result;
}

module.exports = {
  listValues,
  createProductState,
  updateProductState,
  deleteProductState,
  listProductStateById
};