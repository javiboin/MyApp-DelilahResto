require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);
const AddressModel = require('../models/address.model')(connection, Sequelize);
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const createHash = async (passwordToConvert) => {
  const newHash = await bcryptjs.hash(passwordToConvert, 8);
  return newHash;
};

const compareHash = async (password, hashToConvert) => {
  const compare = await bcryptjs.compare(password, hashToConvert);
  return compare;
}

/*
  const passwordEncrypted = await createHash(password);
    console.log(passwordEncrypted); 
  
  const passwordDesencrypted = await compareHash(password, passwordEncrypted);
    console.log(passwordDesencrypted); 
*/

const login = async (info) => {
  const username = info.nickname;
  const password = info.password;

  const usuarioEncontrado = await UsersModel.findOne({ where: { 
    nickname : username
  } });

  const passwordDesencrypted = await compareHash(password, usuarioEncontrado.password);

  if (usuarioEncontrado && passwordDesencrypted){ 
    
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

const listValues = async () => await UsersModel.findAll();

const searchAddress = async (req) => {
  const direccionEncontrada = await AddressModel.findOne({ where: { 
    name: req.body.name,
    number: req.body.number
  } });

  if (!direccionEncontrada) {
    
    const newAddress = await AddressModel.create({
      name: req.body.name,
      number: req.body.number
    }, { transaction: t });

    return newAddress.null;

  } else {
    return direccionEncontrada.id;
  }
}

const createUserTransaction = async (req) => {
  const t = await connection.transaction();
  try {
    const passwordEncrypted = await createHash(req.body.password);

    const newUser = await UsersModel.create({
      nickname: req.body.nickname,
      name: req.body.completeName,
      email: req.body.email,
      phone: req.body.phone,
      password: passwordEncrypted,
      id_user_state: 2
    }, { transaction: t });

    const idUserToUse = newUser.null;

    // Si no existe direccion, creo una nueva direccion
    const idAddressToUse = await searchAddress(req);

    // crear relacion
    await UserAddressModel.create({
      id_user: idUserToUse,
      id_address: idAddressToUse
    }, { transaction: t });

    t.commit();
  } catch (error) {
    console.log('Error en el guardado, Operacion Fallida');
    console.log(error);
    t.rollback();
  }
}

const updateUser = async (req) => {
  const id_user = parseInt(req.params.id);
  const result = await UsersModel.update({
    name: req.body.completeName,
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
  createUserTransaction,
  updateUser,
  deleteUser,
  listUserById
};