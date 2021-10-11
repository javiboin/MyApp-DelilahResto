require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const OrderModel = require('../models/order.model')(connection, Sequelize);

const listValues = async () => await OrderModel.findAll();

const createOrder = async (req) => {
  const newOrder = await OrderModel.build({
    total: req.body.total,
    id_user: req.body.id_user,
    id_address: req.body.id_address,
    id_order_state: req.body.id_order_state,
    id_payment_method: req.body.id_payment_method
  });

  const result = await newOrder.save();
  return result;
}

module.exports = {
  listValues,
  createOrder
};