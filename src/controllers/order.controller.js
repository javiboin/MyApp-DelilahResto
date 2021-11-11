require("dotenv").config();
const { compareSync } = require("bcrypt");
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const OrderModel = require('../models/order.model')(connection, Sequelize);
const OrderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);


// agregar por iteracion los productos que estaban en el pedido
const listValues = async () => {
  await OrderModel.findAll()
};

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
    const newOrder = await OrderModel.create({
      total: req.body.total,
      id_user: req.body.id_user,
      id_address: req.body.id_address,
      id_order_state: req.body.id_order_state,
      id_payment_method: req.body.id_payment_method
    }, { transaction: t });

    const lastOrder = newOrder.null;

    // guardar el detalle del pedido
    let subtotal = 0;

    for (let i = 0; i < req.body.products.length; i++) {
      await OrderDetailModel.create({
        id_order: lastOrder,
        id_product: req.body.products[i].id_product,
        amount: req.body.products[i].amount,
        price: req.body.products[i].price
      }, { transaction: t });

      subtotal += req.body.products[i].price * req.body.products[i].amount
    };

    t.commit();

    await OrderModel.update({
      total: subtotal
    }, { where: { id: lastOrder } }) ;

  } catch (error) {
    console.log('Error!!');
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