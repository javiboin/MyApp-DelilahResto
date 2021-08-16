const express = require('express');
const router = express.Router();
const functions = require('../functions');

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *    - "Productos"
 *    summary: "Listado de todos los productos"
 *    description: Devuelve todos los productos en nuestra app
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listProducts();
  res.json(respuesta);
});

/**
 * @swagger
 * /products:
 *  post:
 *    tags:
 *    - "Productos"
 *    summary: "Agrega Producto"
 *    description: Guarda un nuevo producto en nuestra app
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */
router.post('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearProduct(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    tags:
 *    - "Productos"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificacón en uno o más campos de un producto"
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */
router.put('/:id', function (req, res){
  const idProduct = req.params.id;
  const respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.modificarProduct(idProduct, req.body) : "no es permitido";
  res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    tags:
 *    - Productos
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un producto
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */

router.get('/:id', function (req, res){
  const idProduct = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.productID(idProduct) : "no es correcto";
  res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    tags:
 *    - "Productos"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un producto en nuestra base de datos"
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */

router.delete('/:id', function (req, res){
  const idProduct = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.borrarProduct(idProduct) : "no esta permitido";
  res.json(respuesta);
});

module.exports = router;
