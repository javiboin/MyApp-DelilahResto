require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

const listValues = async () => await orderDetailModel.findAll();

const createOrderDetail = async (req) => {
  const newOrderDetail = await orderDetailModel.build({
    id_order: req.body.id_order,
    id_product: req.body.id_product,
    amount: req.body.amount,
    price: req.body.price,
  });

  const result = await newOrderDetail.save();
  return result;
}

const updateOrderDetail = async (req) => {
  const id_order_detail = parseInt(req.params.id);
  const result = await orderDetailModel.update({
    id_order: req.body.id_order,
    id_product: req.body.id_product,
    amount: req.body.amount,
    price: req.body.price
    },
    { where: { id: id_order_detail } }
  );
  return result;
}

const deleteOrderDetail = async (req) => {
  const id_order_detail = parseInt(req.params.id);
  const result = await orderDetailModel.destroy({
    where: { id: id_order_detail }
  });
  return result;
}

const listOrderDetailById = async (req) => {
  const id_order_detail = parseInt(req.params.id);
  const result = await orderDetailModel.findOne({ where: { id: id_order_detail } });
  return result;
}

module.exports = {
  listValues,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  listOrderDetailById
};