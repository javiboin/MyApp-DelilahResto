require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const AddressModel = require('../models/address.model')(connection, Sequelize);

const listValues = async () => await AddressModel.findAll();

const   createAddress = async (req) => {
  const newAddress = await AddressModel.build({
    name: req.body.name,
    number: req.body.number,
  });

  const result = await newAddress.save();
  return result;
}

module.exports = {
  listValues,
  createAddress
};