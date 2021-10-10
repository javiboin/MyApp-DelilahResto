require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);

const listValues = async () => await UserAddressModel.findAll();

const createUserAddress = async (req) => {
  const newUserAddress = await UserAddressModel.build({
    id_user: req.body.id_user,
    id_address: req.body.id_address,
  });

  const result = await newUserAddress.save();
  return result;
}

module.exports = {
  listValues,
  createUserAddress
};