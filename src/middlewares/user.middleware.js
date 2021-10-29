const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);

function isAdmin(req, res, next) {
  console.log('is admin');
  /* if (req.body.id_user_state === 1) */ 
  if (req.body.nickname === "daveG"){
    console.log('pase por aca');
    next();
  } else {
    res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
  }
};

/* aca lo que quiero hacer es hacer funcionar un middleware solo para pasar informacion */

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

module.exports = { isAdmin, searchUser };