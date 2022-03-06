require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

// MOSTRAR TODOS LOS DETALLES DE LOS PEDIDOS, PARA TAREAS ADMINISTRATIVAS
const listValues = async () => await orderDetailModel.findAll();

// CREAR DETALLE DE PEDIDO, VERIFICAR SI ESTA EN USO, CREO Q NO
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

// MODIFICAR DETALLE DE PEDIDO, VERIFICAR SI ESTA EN USO, CREO Q NO
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

// BORRAR DETALLE DE PEDIDO, VERIFICAR SI ESTA EN USO
const deleteOrderDetail = async (req) => {
  const id_order_detail = parseInt(req.params.id);
  const result = await orderDetailModel.destroy({
    where: { id: id_order_detail }
  });
  return result;
}

// MOSTRAR DETALLE DE PEDIDO SEGUN ID
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