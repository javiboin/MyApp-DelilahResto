require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const paymentMethodModel = require('../models/paymentMethod.model')(connection, Sequelize);

const listValues = async () => await paymentMethodModel.findAll();

const createPaymentMethod = async (req) => {
  const newPaymentMethod = await paymentMethodModel.build({
    name: req.body.name
  });

  const result = await newPaymentMethod.save();
  return result;
}

const updatePaymentMethod = async (req) => {
  const id_payment_method = parseInt(req.params.id);
  const result = await paymentMethodModel.update({
    name: req.body.name
    },
    { where: { id: id_payment_method } }
  );
  return result;
}

const deletePaymentMethod = async (req) => {
  const id_payment_method = parseInt(req.params.id);
  const result = await paymentMethodModel.destroy({
    where: { id: id_payment_method }
  });
  return result;
}

const listPaymentMethodById = async (req) => {
  const id_payment_method = parseInt(req.params.id);
  const result = await paymentMethodModel.findOne({ where: { id: id_payment_method } });
  return result;
}

module.exports = {
  listValues,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  listPaymentMethodById
};