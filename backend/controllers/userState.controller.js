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

module.exports = {
  listValues,
  createUserState
};