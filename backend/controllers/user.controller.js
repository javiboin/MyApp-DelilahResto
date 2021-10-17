/* require('dotenv').config();
const jwt = require('jsonwebtoken');

const users = require('../models/user.model');

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

function login(userObject) {
  const username = userObject.nickname;
  const password = userObject.password;
  
  const logins = users.find(user => user.nickname == username && user.password == password);
  if (logins !== undefined){
    return `Bienvenido a nuestra API ${username}`;
  } else {
    return 'El usuario y/o Contraseña es incorrecta, Vuelva a intentarlo';
  };
};

function listUsers(){
  return(users);
};

function crearUser(userObject) {
  const id = users[users.length -1].id +1;
  users.push({
    id: id,
    nickname: userObject.nickname,
    completeName: userObject.completeName,
    email: userObject.email,
    phone: userObject.phone,
    address: userObject.address,
    password: userObject.password
  });
  return 'User created';
};

function modificarUser(id, userObject){
  let objetoEditado = filterUsers(id);
  
  objetoEditado.id = parseInt(id);

  if (userObject.nickname != undefined){
    objetoEditado.nickname = userObject.nickname;
  };

  if (userObject.completeName != undefined){
    objetoEditado.completeName = userObject.completeName;
  };

  if (userObject.email != undefined){
    objetoEditado.email = userObject.email;
  };

  if (userObject.phone != undefined){
    objetoEditado.phone = userObject.phone;
  };

  if (userObject.address != undefined){
    objetoEditado.address = userObject.address;
  };

  if (userObject.password != undefined){
    objetoEditado.password = userObject.password;
  };

  users[searchIndex(id)] = objetoEditado;

  return 'User updated';
};

function borrarUser(idUser){
  const objetoBuscado = users[searchIndex(idUser)];

  const userPosition = users.indexOf(objetoBuscado);

  users.splice(userPosition, 1);

  return 'User deleted'; 
};

const login1 = (info) => {
  const username = info.username;
  const password = info.password;
  const data = { user : 'admin', password: 'clavesegura'};

  if (username === data.user && password === data.password) {
      const token = jwt.sign({ user: data.user }, process.env.JWT_SECRET, { expiresIn: 3600 });
      return { yourToken: token };
  } else {
      return 'inicio incorrecto';
  }

}

module.exports = {
  obtenerNickname,
  obtenerNombre,
  obtenerDireccion,
  emailrepetido,
  filterUsers,
  login,
  listUsers,
  crearUser,
  modificarUser,
  borrarUser,
  login1
};

exports.obtenerNickname = obtenerNickname;
exports.obtenerNombre = obtenerNombre;
exports.obtenerDireccion = obtenerDireccion;

exports.emailrepetido = emailrepetido;

exports.filterUsers = filterUsers;
exports.login = login;
exports.listUsers = listUsers;

exports.crearUser = crearUser;
exports.modificarUser = modificarUser;
exports.borrarUser = borrarUser; */ 

require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);

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
  listValues,
  listValuesRedis,
  createUser,
  updateUser,
  deleteUser,
  listUserById
};