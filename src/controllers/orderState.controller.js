require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderStateModel = require('../models/orderState.model')(connection, Sequelize);
const all = require('../middlewares/all.middleware');

// MOSTAR ESTADO DE UN PEDIDO
const listValues = async () => await orderStateModel.findAll();

// CREAR ESTADO DE LOS PRODUCTOS
const createOrderState = async (req) => {
  const newOrderState = await orderStateModel.build({
    name: req.body.name
  });

  const result = await newOrderState.save();
  return result;
}

// MODIFICAR ESTADO DE LOS PEDIDOS
const updateOrderState = async (req) => {
  const id_order_state = parseInt(req.params.id);
    const result = await orderStateModel.update({
      name: req.body.name
      },
      { where: { id: id_order_state } }
    );
    return result;
}

// BORRAR ESTADO DE LOS PEDIDOS
const deleteOrderState = async (req) => {
  const id_order_state = parseInt(req.params.id);
  const result = await orderStateModel.destroy({
    where: { id: id_order_state }
  });
  return result;
}

// MOSTAR EL ESTADO DEL PEDIDO SEGUN ID
const listOrderStateById = async (req) => {
  const id_order_state = parseInt(req.params.id);
  const result = await orderStateModel.findOne({ where: { id: id_order_state } });
  return result;
}

module.exports = {
  listValues,
  createOrderState,
  updateOrderState,
  deleteOrderState,
  listOrderStateById
};