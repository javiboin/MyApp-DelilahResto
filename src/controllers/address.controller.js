require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const AddressModel = require('../models/address.model')(connection, Sequelize);
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);

// MOSTRAR TODOS LOS VALORES DENTRO DE LA TABLA
const listValues = async () => await AddressModel.findAll();

// CREAR UNA DOMICILIO
const   createAddress = async (req) => {
  const newAddress = await AddressModel.build({
    name: req.body.name,
    number: req.body.number,
  });

  const result = await newAddress.save();
  return result;
}

// MODIFICAR DOMICILIO
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

// BORRAR DOMICILIO
const deleteAddress = async (req) => {
  const id_address = parseInt(req.params.id);
  const result = await AddressModel.destroy({
    where: { id: id_address }
  });
  return result;
}

// MOSTRAR DOMICILIO SEGUN ID
const listAddressById = async (req) => {
  const id_address = parseInt(req.params.id);
  const result = await AddressModel.findOne({ where: { id: id_address } });
  return result;
}

// MOSTRAR DOMICILIO DE UN USUARIO
const listAddressByUser = async (req) => {
  const id_address_user = parseInt(req.params.id_user);
  const result = await UserAddressModel.findAll({ where: { 
    id_user: id_address_user 
    }
  });

  return result;
}

module.exports = {
  listValues,
  createAddress,
  updateAddress,
  deleteAddress,
  listAddressById,
  listAddressByUser
};