require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const UsersModel = require('../models/user.model')(connection, Sequelize);
const AddressModel = require('../models/address.model')(connection, Sequelize);
const UserAddressModel = require('../models/userAddress.model')(connection, Sequelize);

// CODIFICAR COMUNICACIONES
const encoded = require('../middlewares/encoded.middleware');

// METODOS DE ENCRIPTACION, UTILIZAR EN TODA LA APP, POR SEGURIDAD, ANOTAR
const jwt = require('jsonwebtoken');  // VERIFICAR SI ES ALGO QUE DETIENE LA EJECUCIO DEL SERVIDOR

// FUNCION LOGIN, UTILIZAR ACA LOS METODOS DE AUTENTICACION? USO DE ENCRIPTACION
const login = async (info) => {
  const username = info.nickname;
  const password = info.password;

  const usuarioEncontrado = await UsersModel.findOne({ where: { 
    nickname : username
  } });

  const passwordDesencrypted = await encoded.compareHash(password, usuarioEncontrado.password);

  // UTILIZAR ESTA RUTINA EN CADA ENDPOINT, DEBERIA CAMBIARLO POR UN MIDDLEWAR PERO ESPERA
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

// CREAR UN USUARIO CON LAS TRANSACCIONES, OK
const createUserTransaction = async (req) => {
  const t = await connection.transaction();
  try {
    const passwordEncrypted = await encoded.createHash(req.body.password);

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

// MOSTRAR LOS USUARIOS DEL SISTEMA
const listValues = async () => await UsersModel.findAll();

// BUSCAR UNA DOMICILIO
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

// MODIFICAR USUARIOS, TENER CUIDADO CON LAS INTEGRACIONES, QUE HACER EN ESTE CASO DE USO
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

// BORRAR USUARIOS
const deleteUser = async (req) => {
  const id_user = parseInt(req.params.id);
  const result = await UsersModel.destroy({
    where: { id: id_user }
  });
  return result;
}

// MOSTRAR USUARIO SEGUN ID
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
