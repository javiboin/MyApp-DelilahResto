require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductStateModel = require('../models/productState.model')(connection, Sequelize);

// MOSTRAR LOS ESTADOS DE LOS PRODUCTOS, SI ESTAN EN DISPONIBILIDAD O NO
const listValues = async () => await ProductStateModel.findAll();

// CREAR EL ESTADO DE LOS PRODUCTOS
const createProductState = async (req) => {
  const newProductState = await ProductStateModel.build({
    name: req.body.name
  });

  const result = await newProductState.save();
  return result;
}

// MODIFICAR EL ESTADO DE LOS PRODUCTOS
const updateProductState = async (req) => {
  const id_product_state = parseInt(req.params.id);
  const result = await ProductStateModel.update({
    name: req.body.name
    },
    { where: { id: id_product_state } }
  );
  return result;
}

// BORRAR EL ESTADO DE LOS PRODUCTOS
const deleteProductState = async (req) => {
  const id_product_state = parseInt(req.params.id);
  const result = await ProductStateModel.destroy({
    where: { id: id_product_state }
  });
  return result;
}

// MOSTRAR UN ESTADO DE PRODUCTOS SEGUN ID
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