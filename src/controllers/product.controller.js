require("dotenv").config();
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const ProductModel = require('../models/product.model')(connection, Sequelize);

const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const redisClient = redis.createClient();

redisClient.on('err', err => { console.log(err) });

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

const updateProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.update({
    name: req.body.name,
    price: req.body.price,
    pic: req.body.pic
    },
    { where: { id: id_product } }
  );

  // actualizar redis  !!!!!!!!!!!!!
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

const deleteProduct = async (req) => {
  const id_product = parseInt(req.params.id);
  const result = await ProductModel.destroy({
    where: { id: id_product }
  });
  return result;
}

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