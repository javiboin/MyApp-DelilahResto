require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserSuspensionModel = require('../models/userSuspension.model')(connection, Sequelize);

const listValues = async () => await UserSuspensionModel.findAll();

const createUserSuspension = async (req) => {
  const newUserSuspension = await UserSuspensionModel.build({
    reason: req.body.reason,
    id_user: req.body.id_user
  });

  const result = await newUserSuspension.save();
  return result;
};

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

const deleteUserSupension = async (req) => {
  const id_user_suspension = parseInt(req.params.id);
  const result = await UserSuspensionModel.destroy({
    where: { id: id_user_suspension }
  });
  return result;
}

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