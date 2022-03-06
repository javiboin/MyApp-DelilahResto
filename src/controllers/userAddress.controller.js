require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);

// MOSTRAR RELACIONES DE USUARIOS CON DOMICILIOS
const listValues = async () => await UserAddressModel.findAll();

// CREAR UNA NUEVA RELACION ENTRE USUARIO Y DOMICILIO
const createUserAddress = async (req) => {
  const newUserAddress = await UserAddressModel.build({
    id_user: req.body.id_user,
    id_address: req.body.id_address,
  });

  const result = await newUserAddress.save();
  return result;
}

// MODIFICAR USUARIOS
const updateUserAddress = async (req) => {
  const id_user_address = parseInt(req.params.id);
  const result = await UserAddressModel.update({
    id_user: req.body.id_user,
    id_address: req.body.id_address,
    },
    { where: { id: id_user_address } }
  );
  return result;
}

// BORRAR UNA RELACION ENTRE USUARIOS Y DOMICILIOS
const deleteUserAddress = async (req) => {
  const id_user_address = parseInt(req.params.id);
  const result = await UserAddressModel.destroy({
    where: { id: id_user_address }
  });
  return result;
}

// MOSTRAR RELACION SEGUN ID
const listUserAddressById = async (req) => {
  const id_user_address = parseInt(req.params.id);
  const result = await UserAddressModel.findOne({ where: { id: id_user_address } });
  return result;
}

module.exports = {
  listValues,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  listUserAddressById
};