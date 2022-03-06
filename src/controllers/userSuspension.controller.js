require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserSuspensionModel = require('../models/userSuspension.model')(connection, Sequelize);

// MOSTRAR TODAS LAS SUSPENSIONES DE USUARIOS
const listValues = async () => await UserSuspensionModel.findAll();

// CREAR UNA NUEVA SUSPENSION DE UN USUARIO
const createUserSuspension = async (req) => {
  const newUserSuspension = await UserSuspensionModel.build({
    reason: req.body.reason,
    id_user: req.body.id_user
  });

  const result = await newUserSuspension.save();
  return result;
};

// MODIFICAR SUSPENSION DE USUARIO
const updateUserSupension = async (req) => {
  const id_user_suspension = parseInt(req.params.id);
  const result = await UserSuspensionModel.update({
    reason: req.body.reason,
    id_user: req.body.id_user
    },
    { where: { id: id_user_suspension } }
  );
  return result;
}

// BORRAR UNA SUSPENSION DE USUARIO
const deleteUserSupension = async (req) => {
  const id_user_suspension = parseInt(req.params.id);
  const result = await UserSuspensionModel.destroy({
    where: { id: id_user_suspension }
  });
  return result;
}

// LISTAR LA SUSPENSION DE USUARIO SEGUN ID
const listUserSupensionById = async (req) => {
  const id_user_suspension = parseInt(req.params.id);
  const result = await UserSuspensionModel.findAll({ where: { id_user: id_user_suspension } });
  return result;
}

module.exports = {
  listValues,
  createUserSuspension,
  updateUserSupension,
  deleteUserSupension,
  listUserSupensionById
};