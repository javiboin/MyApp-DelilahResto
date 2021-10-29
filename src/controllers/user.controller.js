/* 
const searchIndex = (id) => {
  return users.findIndex(x => x.id == id);
};

function obtenerNickname(id){
  let nickname = users[searchIndex(id)].nickname;
  return nickname;
};

function obtenerNombre(id){
  let name = users[searchIndex(id)].completeName;
  return name;
};

function obtenerDireccion(id){
  let address = users[searchIndex(id)].address;
  return address;
};

function emailrepetido(email){
  return users.find(user => user.email === email) ? true : false;
};

function filterUsers(id){
  const datosFiltrados = users.find(usuario => usuario.id == Number(id));
  return datosFiltrados;
};
 */ 

require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);

const users = require('../models/user.model');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const login = async (info) => {
  const username = info.nickname;
  const password = info.password;

  const usuarioEncontrado = await UsersModel.findOne({ where: { 
    nickname : username,
    password : password
  } });

  if (usuarioEncontrado) {
    const token = jwt.sign({ 
      nickname: usuarioEncontrado.nickname ,
      password: usuarioEncontrado.password ,
      id_user_state : usuarioEncontrado.id_user_state
    }, process.env.JWT_SECRET, { expiresIn : '1h' });

    return { yourToken : token };
  } else {
    throw new Error
  }
};

/* middleware validar si existe usuario en BD
revisar si esta */

const listValues = async () => await UsersModel.findAll();

const listValuesRedis = async () => await UsersModel.findAll();



const createUser = async (req) => {
  const newUser = await UsersModel.build({
    nickname: req.body.nickname,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    id_user_state: req.body.id_user_state
  });

  const result = await newUser.save();
  return result;
}

const updateUser = async (req) => {
  const id_user = parseInt(req.params.id);
  const result = await UsersModel.update({
    nickname: req.body.nickname,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    id_user_state: req.body.id_user_state
    },
    { where: { id: id_user } }
  );
  return result;
}

const deleteUser = async (req) => {
  const id_user = parseInt(req.params.id);
  const result = await UsersModel.destroy({
    where: { id: id_user }
  });
  return result;
}

const listUserById = async (req) => {
  const id_user = parseInt(req.params.id);
  const result = await UsersModel.findOne({ where: { id: id_user } });
  return result;
}

module.exports = {
  login,
  listValues,
  listValuesRedis,
  createUser,
  updateUser,
  deleteUser,
  listUserById
};