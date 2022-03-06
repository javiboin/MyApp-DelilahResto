require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserStateModel = require('../models/userStates.model')(connection, Sequelize);

// MOSTRAR LOS ESTADOS DE LOS USUARIOS
const listValues = async () => await UserStateModel.findAll();

// CREAR ESTADO DE USUARIOS
const createUserState = async (req) => {
  const newUserState = await UserStateModel.build({
    name: req.body.name
  });

  const result = await newUserState.save();
  return result;
}

// MODIFICAR EL ESTADO DE LOS PEDIDOS
const updateUserState = async (req) => {
  const id_user_state = parseInt(req.params.id);
  const result = await UserStateModel.update({
    name: req.body.name
    },
    { where: { id: id_user_state } }
  );
  return result;
}

// BORRAR EL ESTADO DE LOS USUARIOS
const deleteUserState = async (req) => {
  const id_user_state = parseInt(req.params.id);
  const result = await UserStateModel.destroy({
    where: { id: id_user_state }
  });
  return result;
}

// MOSTRAR UN ESTADO DE USUARIO SEGUN ID
const listUserStateById = async (req) => {
  const id_user_state = parseInt(req.params.id);
  const result = await UserStateModel.findOne({ where: { id: id_user_state } });
  return result;
}

module.exports = {
  listValues,
  createUserState,
  updateUserState,
  deleteUserState,
  listUserStateById
};