require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const orderStateModel = require('../models/orderState.model')(connection, Sequelize);

const listValues = async () => await orderStateModel.findAll();

const createOrderState = async (req) => {
  const newOrderState = await orderStateModel.build({
    name: req.body.name
  });

  const result = await newOrderState.save();
  return result;
}

module.exports = {
  listValues,
  createOrderState
};