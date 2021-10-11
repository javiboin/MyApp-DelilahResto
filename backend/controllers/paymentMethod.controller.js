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

module.exports = {
  listValues,
  createPaymentMethod
};