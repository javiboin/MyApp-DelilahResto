require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UserSuspensionModel = require('../models/userSuspension.model')(connection, Sequelize);

const listValues = async () => await UserSuspensionModel.findAll();

const createUserSuspension = async (req) => {
  const newUserSuspension = await UserSuspensionModel.build({
    reason: req.body.reason,
    id_user: req.body.id_user,
  });

  const result = await newUserSuspension.save();
  return result;
}

module.exports = {
  listValues,
  createUserSuspension
};