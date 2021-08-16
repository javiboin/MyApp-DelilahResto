const express = require('express');
const router = express.Router();
const functions = require('../functions');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**
 * @swagger
 * /orders:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: "Listado de todos los pedidos"
 *    description: Devuelve todos los pedidos realizados en nuestra app
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listOrders();
  res.json(respuesta);
});

/**
 * @swagger
 * /orders:
 *  post:
 *    tags:
 *    - "Pedidos"
 *    summary: "Agrega Pedido"
 *    description: Guarda un nuevo pedido de comida en nuestra app
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: state
 *      description: Estado del pedido 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: products
 *      description: Listado de productos en el pedido 
 *      in: formData
 *      required: true
 *      type: array
 *    - name: formaPago
 *      description: Metodos de pago 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del pedido 
 *      in: formData
 *      required: true
 *      type: integer
 */

router.post('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearOrder(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /orders/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificacón en uno o mas campos de un pedido"
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: state
 *      description: Estado del pedido 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: products
 *      description: Listado de productos en el pedido 
 *      in: formData
 *      required: true
 *      type: array
 *    - name: formaPago
 *      description: Metodos de pago 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del pedido 
 *      in: formData
 *      required: true
 *      type: integer
 */

router.put('/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders(idOrders) ? functions.modificarOrder(idOrders ,req.body) : "no es correcto";
  res.json(respuesta);
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un pedido
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: state
 *      description: Estado del pedido 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: products
 *      description: Listado de productos en el pedido 
 *      in: formData
 *      required: true
 *      type: array
 *    - name: formaPago
 *      description: Metodos de pago 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del pedido 
 *      in: formData
 *      required: true
 *      type: integer
 */

router.get('/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders ? functions.orderID(idOrders) : "no es correcto";
  res.json(respuesta);
});

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *    tags:
 *    - "Pedidos"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un pedido en nuestra base de datos"
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: state
 *      description: Estado del pedido 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: products
 *      description: Listado de productos en el pedido 
 *      in: formData
 *      required: true
 *      type: array
 *    - name: formaPago
 *      description: Metodos de pago 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del pedido 
 *      in: formData
 *      required: true
 *      type: integer
 */

router.delete('/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders ? functions.borrarOrder(idOrders) : "no es correcto";
  res.json(respuesta);
});

module.exports = router;
