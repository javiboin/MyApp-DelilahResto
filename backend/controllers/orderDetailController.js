require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

const listValues = async () => await orderDetailModel.findAll();

const createOrderDetail = async (req) => {
  const newOrderDetail = await orderDetailModel.build({
    id_order: req.body.id_order,
    id_product: req.body.id_product,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  const result = await newOrderDetail.save();
  return result;
}

module.exports = {
  listValues,
  createOrderDetail
};