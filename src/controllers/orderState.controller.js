require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderStateModel = require('../models/orderState.model')(connection, Sequelize);
const all = require('../middlewares/all.middleware');

const listValues = async () => await orderStateModel.findAll();

const createOrderState = async (req) => {
  const newOrderState = await orderStateModel.build({
    name: req.body.name
  });

  const result = await newOrderState.save();
  return result;
}

const updateOrderState = async (req) => {
  const id_order_state = parseInt(req.params.id);
    const result = await orderStateModel.update({
      name: req.body.name
      },
      { where: { id: id_order_state } }
    );
    return result;
}

const deleteOrderState = async (req) => {
  const id_order_state = parseInt(req.params.id);
  const result = await orderStateModel.destroy({
    where: { id: id_order_state }
  });
  return result;
}

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