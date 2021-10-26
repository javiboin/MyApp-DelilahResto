require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const OrderModel = require('../models/order.model')(connection, Sequelize);
const OrderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

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

const createOrderTransaction = async (req) => {
  const t =  await connection.transaction();
  try {
    // guardar aca la orden
    /* const newOrder =  */await OrderModel.create({
      total: req.body.total,
      id_user: req.body.id_user,
      id_address: req.body.id_address,
      id_order_state: req.body.id_order_state,
      id_payment_method: req.body.id_payment_method
    }), { transaction: t };

    //await newOrder.save();

    // guardar el detalle del pedido

    // deberia crear un order detail por producto, deberia nose q usar
    /* const newOrderDetail = */ await OrderDetailModel.create({
      id_order: req.body.id_order,
      id_product: req.body.id_product,
      amount: req.body.amount,
      price: req.body.price
    }), { transaction: t };

    //await newOrderDetail.save();

    // commit 
    console.log('antes del commit');
    t.commit();
    console.log('despues del coso');
  } catch (error) {
    console.log('aca hay un error, decime cual error!!!!')
    console.log(error);
    t.rollback();
  }
}

const updateOrder = async (req) => {
  const id_order = parseInt(req.params.id);
  const result = await OrderModel.update({
    total: req.body.total,
    id_user: req.body.id_user,
    id_address: req.body.id_address,
    id_order_state: req.body.id_order_state,
    id_payment_method: req.body.id_payment_method
    },
    { where: { id: id_order } }
  );
  return result;
}

const deleteOrder = async (req) => {
  const id_order = parseInt(req.params.id);
  const result = await OrderModel.destroy({
    where: { id: id_order }
  });
  return result;
}

const listOrderById = async (req) => {
  const id_order = parseInt(req.params.id);
  const result = await OrderModel.findOne({ where: { id: id_order } });
  return result;
}

module.exports = {
  listValues,
  createOrder,
  createOrderTransaction,
  updateOrder,
  deleteOrder,
  listOrderById
};