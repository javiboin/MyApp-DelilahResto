const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);

const searchUser = async (req, res, next) => {
  const usuarioEncontrado = await UsersModel.findOne({ where: { 
    nickname : req.body.nickname
  } });

  const emailEncontrado = await UsersModel.findOne({ where: { 
    email : req.body.email
  } });

  console.log(usuarioEncontrado);
  if (!usuarioEncontrado && !emailEncontrado) {
    next();
  } else {
    res.status(400).send('Existe otro usuario con este nombre y/o email')
  }
}

module.exports = { searchUser };