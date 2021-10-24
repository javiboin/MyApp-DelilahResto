require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const AddressModel = require('../models/address.model')(connection, Sequelize);

const jwt = require('jsonwebtoken');

const listValues = async () => await AddressModel.findAll();

const   createAddress = async (address, token) => {

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.user);

  if (decoded.user === 'admin') {
    return 'no autorizado';
  }

/*   const newAddress = await AddressModel.build({
    name: address.name,
    number: address.number,
  });

  const result = await newAddress.save();
  return result; */
}

const updateAddress = async (req) => {
  const id_address = parseInt(req.params.id);
  const result = await AddressModel.update({
    name: req.body.name,
    number: req.body.number,
    },
    { where: { id: id_address } }
  );
  return result;
}

const deleteAddress = async (req) => {
  const id_address = parseInt(req.params.id);
  const result = await AddressModel.destroy({
    where: { id: id_address }
  });
  return result;
}

const listAddressById = async (req) => {
  const id_address = parseInt(req.params.id);
  const result = await AddressModel.findOne({ where: { id: id_address } });
  return result;
}

module.exports = {
  listValues,
  createAddress,
  updateAddress,
  deleteAddress,
  listAddressById
};