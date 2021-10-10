require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const AddressModel = require('../models/address.model')(connection, Sequelize);

const listValues = async () => await AddressModel.findAll();

module.exports = {
  listValues
};