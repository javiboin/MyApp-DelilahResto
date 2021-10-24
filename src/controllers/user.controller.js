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



function listUsers(){
  return(users);
};

function crearUser(req) {
  const id = users[users.length -1].id +1;
  users.push({
    id: id,
    nickname: req.nickname,
    completeName: req.completeName,
    email: req.email,
    phone: req.phone,
    address: req.address,
    password: req.password
  });
  return 'User created';
};

function modificarUser(id, req){
  let objetoEditado = filterUsers(id);
  
  objetoEditado.id = parseInt(id);

  if (req.nickname != undefined){
    objetoEditado.nickname = req.nickname;
  };

  if (req.completeName != undefined){
    objetoEditado.completeName = req.completeName;
  };

  if (req.email != undefined){
    objetoEditado.email = req.email;
  };

  if (req.phone != undefined){
    objetoEditado.phone = req.phone;
  };

  if (req.address != undefined){
    objetoEditado.address = req.address;
  };

  if (req.password != undefined){
    objetoEditado.password = req.password;
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
}; */ 

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
  }
};

const searchUser = async (username, password) => {
  const usuarioEncontrado = await UsersModel.findOne({ where: { 
    nickname : username,
    password : password
  } });
  return usuarioEncontrado;
}

/* middleware validar si existe usuario en BD
revisar si esta */

const listValues = async () => await UsersModel.findAll();

const listValuesRedis = async () => await UsersModel.findAll();

const createUser = async (req) => {

/*   const listUserById = async (req) => {
    const id_user = parseInt(req.params.id);
    const result = await UsersModel.findOne({ where: { id: id_user } });
    return result;
  } 
  
  req.body.name 
  const algo = await UsersModel.findOne ( { where : { users.name : req.body.name } } );
  if algo { no esta permitido } 
  else { guardar }


  
  */


  // llamar a searchname

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

const searchName = async (req) => {
/*   req.body.name 
  const algo = await UsersModel.findOne ( { where : { users.name : req.body.name } } );
  if algo { no esta permitido } 
  else { guardar } */
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