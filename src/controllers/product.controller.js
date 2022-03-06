require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductModel = require('../models/product.model')(connection, Sequelize);

const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

// CONEXION CON REDIS, PORT HARDCODEADO, ESTA MAL, MODIFICAR MOSTRO
const redisClient = redis.createClient({
  host: process.env.ELASTICACHE_URL,
  port: 6379
});

// PRENDER SERVIDOR REDIS, YA SE ENCUENTRA PRENDIDO DESDE AWS
redisClient.on('err', err => { console.log(err) });

// MOSTRAR TODOS LOS PRODUCTOS, DESDE EL CACHE, SI NO EXISTE TOMAR DESDE LA BASE DE DATOS
const getProducts = async() => {
  const productsOnRedis = await redisClient.getAsync('all-products');

  if (productsOnRedis !== null) {
    return JSON.parse(productsOnRedis);
  } else {
    const result = await ProductModel.findAll()
      .then((res) => {
        redisClient.set('all-products', JSON.stringify(res), 'EX', 60 * 20);
        return res;
      })
      .catch((err) => {
        return err});
      return result;
      }
}

//const getProducts007 = async() => {
//  const productsRedisKey = "products";
//  redisClient.get(productsRedisKey, async (error, result) => {
//    if(error) {
//      return error;
//    }
//
//    if (result) {
//      return result;
//    } else {
//      const product = await ProductModel.findAll();
//      redisClient.set(productsRedisKey, JSON.stringify(product));
//      return { product }
//    }
//  })
//}

// CREAR UN PRODUCTO, REVISAR CAMPOS
const createProduct = async (req) => {
  const newProduct = await ProductModel.build({
    name: req.body.name,
    price: parseFloat(req.body.price),
    pic: req.body.pic,
    id_product_state: 1
  });

  const result = await newProduct.save();
  return result;
}

// MODIFICAR UN PRODUCTO
const updateProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.update({
    name: req.body.name,
    price: req.body.price,
    pic: req.body.pic
    },
    { where: { id: id_product } }
  );

  // actualizar redis  !!!!!!!!!!!!! REVISAR ESTA SENTENCIA
  if (req.body.price !== undefined) { 
    await ProductModel.findAll()
    .then((res) => {
      redisClient.set('all-products', JSON.stringify(res), 'EX', 60 * 20);
      return res;
    })
    .catch((err) => {
      return err});
  }

  return result;
}

// BORRAR PRODUCTO
const deleteProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.destroy({
    where: { id: id_product }
  });
  return result;
}

// LISTAR PRODUCTOS SEGUN ID
const listProductById = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.findOne({ where: { id: id_product } });
  return result;
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listProductById
};
