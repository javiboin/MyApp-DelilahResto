require("dotenv").config();
const { compareSync } = require("bcrypt");
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const OrderModel = require('../models/order.model')(connection, Sequelize);
const OrderDetailModel = require('../models/orderDetail.model')(connection, Sequelize);

const listValues = async () => {
  const result = await OrderModel.findAll();
  return result;
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

// con transaccion
// guardar nuevos 
const updateOrderTransaction = async (req) => {
  const idOrder = parseInt(req.params.id)
  console.log('empezar con la transaccion');
  const t =  await connection.transaction();
  try {
    // guardar la orden
    console.log('modificando pedido')
    await OrderModel.update({
      total: req.body.total, // capas hay q sacarlo
      id_user: req.body.id_user,
      id_address: req.body.id_address,
      id_order_state: req.body.id_order_state,
      id_payment_method: req.body.id_payment_method
    }, 
    { 
      transaction: t,
      where: { id: idOrder }
    });

    // guardar el detalle del pedido
    let subtotal = 0;

    for (let i = 0; i < req.body.products.length; i++){ 
      //verificar si existe en el pedido
      console.log('entrando a la verificacion')
      const productoEncontrado = await OrderDetailModel.findOne({ 
        where: { 
          id_order: idOrder,
          id_product: req.body.products[i].id_product
        } 
      });

      if (productoEncontrado) {
        // modifico cantidades
        console.log('modificando producto')
        await OrderDetailModel.update({
          amount: req.body.products[i].amount,
          price: req.body.products[i].price
        }, 
        { 
          transaction: t,
          where: { id_order: idOrder }
        });
      } else {
        // creo el nuevo objeto
        console.log('creandop un nuevo producto');
        await OrderDetailModel.create({
          id_order: idOrder,
          id_product: req.body.products[i].id_product,
          amount: req.body.products[i].amount,
          price: req.body.products[i].price
        }, { transaction: t });
      } 

      // recalcular el subtotal
      subtotal += req.body.products[i].price * req.body.products[i].amount
    }

    t.commit();

    // recalcular el total
    await OrderModel.update({
      total: subtotal
    }, { where: { id: idOrder } }) ;

  } catch (error) {
    console.log('Error!!');
    console.log(error);
    t.rollback();
  }
}

/* const updateOrder = async (req) => {
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
} */

const confirmOrder = async (req) => {
  const id_order = parseInt(req.params.id);

  const result = await OrderModel.update({
    id_order_state: 2,
    id_address: req.body.id_address
  },
    { where: { id: id_order } }
  );

  return result;
}

const changeStateByAdmin = async (req) => {
  const id_order = parseInt(req.params.id);

  const result = await OrderModel.update({
    id_order_state: req.body.id_state
  },
    { where: { id: id_order } }
  );

  return result;
}

const deleteOrderTransaction = async (req) => {
  const t =  await connection.transaction();
  try {
    const id_order = parseInt(req.params.id);

    await OrderModel.destroy({
      where: { id: id_order }
    }, { transaction: t });

    await OrderDetailModel.destroy({
      where: { id_order: id_order }
    }, { transaction: t });

    t.commit();
  } catch (error) {
    console.log('Error!!');
    console.log(error);
    t.rollback();
  }
}

const listOrderById = async (req) => {
  const id_order = parseInt(req.params.id);
  const result = await OrderModel.findOne({ where: { id: id_order } });
  return result;
}

const listOrderByUser = async (req) => {
  const idUser = req.params.id_user;
  const result = await OrderModel.findAll({ where: { id_user: idUser } });
  return result;
}

module.exports = {
  listValues,
  createOrder,
  createOrderTransaction,
  updateOrderTransaction,
  confirmOrder,
  changeStateByAdmin,
  deleteOrderTransaction,
  listOrderById,
  listOrderByUser
};