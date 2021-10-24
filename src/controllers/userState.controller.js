require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserStateModel = require('../models/userStates.model')(connection, Sequelize);

const listValues = async () => await UserStateModel.findAll();

const createUserState = async (req) => {
  const newUserState = await UserStateModel.build({
    name: req.body.name
  });

  const result = await newUserState.save();
  return result;
}

const updateUserState = async (req) => {
  const id_user_state = parseInt(req.params.id);
  const result = await UserStateModel.update({
    name: req.body.name
    },
    { where: { id: id_user_state } }
  );
  return result;
}

const deleteUserState = async (req) => {
  const id_user_state = parseInt(req.params.id);
  const result = await UserStateModel.destroy({
    where: { id: id_user_state }
  });
  return result;
}

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