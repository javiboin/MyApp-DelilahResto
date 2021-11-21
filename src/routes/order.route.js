const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const OrderController = require("../controllers/order.controller");
const all = require('../middlewares/all.middleware');

router.get("/", all.isAdmin, (req, res) => {
  OrderController.listValues()
  .then((result) => {
    res.status(200).send({
      status: 200,
      message: "Data find Successfully",
      data: result
    });
  })
  .catch(error => {
    res.status(404).send({
      message: "Unable to find data",
      errors: error,
      status: 404
    });
  });
});

router.post("/", (req, res) => {
  OrderController.createOrderTransaction(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Save Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 400
    });
  });
});

router.get("/:id", (req, res) => {
  OrderController.listOrderById(req)
  .then((result) => {
    res.status(200).send({
      status: 200,
      message: "Data find Successfully",
      data: result
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to find data",
      errors: error,
      status: 400
    });
  });
});

router.get("/byuser/:id_user", (req, res) => {
  OrderController.listOrderByUser(req)
  .then((result) => {
    res.status(200).send({
      status: 200,
      message: "Data find Successfully",
      data: result
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to find data",
      errors: error,
      status: 400
    });
  });
});

router.put('/confirmar-pedido/:id',(req, res) => {
  OrderController.confirmOrder(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Update Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Update data",
      errors: error,
      status: 400
    });
  });
});

router.put('/state-byadmin/:id', all.isAdmin, (req, res) => {
  OrderController.changeStateByAdmin(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Update Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Update data",
      errors: error,
      status: 400
    });
  });
});

router.put('/modificar-pedido/:id', (req, res) => {
  OrderController.updateOrderTransaction(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Update Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Update data",
      errors: error,
      status: 400
    });
  });
});

router.delete('/:id', (req, res) => {
  OrderController.deleteOrderTransaction(req)
  .then(() => {
    res.status(200).send({
      status: 200,
      message: "Data Delete Successfully",
    });
  })
  .catch(error => {
    res.status(400).send({
      message: "Unable to Delete data",
      errors: error,
      status: 400
    });
  });
});

/**
 * @swagger
 * /orders:
 *  get:
 *    tags:
 *    - "Pedidos" 
 *    summary: "Listado de todos los Pedidos - SOLO ADMINS"
 *    description: Devuelve todos los pedidos realizados solo para Usuarios Administradores
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/byuser/{idUser}:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: Listado de todos los pedidos que realizo un usuario
 *    description: Encuentra tu historial de pedidos realizados
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: idUser
 *      description: ID de usuario 
 *      in: path
 *      required: true
 *      type: integer
 *      default: 1
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: "Ver info de pedidos por ID"
 *    description: Todos los datos de un pedido
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: ID del pedido
 *      in: path
 *      required: false
 *      type: integer
 *      default: 1
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders:
 *  post:
 *    tags:
 *    - "Pedidos"
 *    summary: "Agrega Pedido"
 *    description: Guarda un nuevo pedido de comida en nuestra app
 *    parameters: 
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - in: body
 *      name: orders
 *      required: false
 *      description : Listado de productos en el pedido 
 *      schema:
 *        type: object
 *        properties:
 *          total:
 *            type: number
 *            example: 150.00 
 *            default: 150.00
 *          id_user:
 *            type: integer
 *            default: 1
 *          id_address:
 *            type: integer
 *            default: 1
 *          id_order_state:
 *            type: integer
 *            default: 1
 *          id_payment_method:
 *            type: integer
 *            default: 1
 *          products:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id_product:
 *                  type: integer
 *                  example: 1
 *                amount: 
 *                  type: integer
 *                  example: 2
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/confirmar-pedido/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "USUARIO Confirma Pedido "
 *    description: "Se confirma el pedido, a partir de aqui, el usuario no puede modificar el pedido"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: ID del Pedido
 *      in: path
 *      required: true
 *      type: integer
 *      default: 3
 *    - name: id_address
 *      description: Id de Direccion 
 *      in: formData
 *      required: false
 *      type: integer
 *      default: 3
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/state-byadmin/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Modifica Estados del pedido "
 *    description: "Se realiza la actualización del estado del pedido SOLO administradores"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: ID del pedido
 *      in: path
 *      required: true
 *      type: integer
 *      default: 1
 *    - name: id_state
 *      description: Actualiza el Estado del pedido
 *      in: formData
 *      required: true
 *      type: integer
 *      default: 3
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/modificar-pedido/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Modifica Pedido"
 *    description: El usuario puede realizar modificaciones al pedido antes de confirmarlo
 *    parameters: 
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de pedido
 *      in: path
 *      required: true
 *      type: integer
 *      default: 1
 *    - in: body
 *      name: orders
 *      required: false
 *      description : Listado de productos en el pedido 
 *      schema:
 *        type: object
 *        properties:
 *          total:
 *            type: number
 *            example: 150.00 
 *            default: 150.00
 *          id_user:
 *            type: integer
 *            default: 1
 *          id_address:
 *            type: integer
 *            default: 1
 *          id_order_state:
 *            type: integer
 *            default: 1
 *          id_payment_method:
 *            type: integer
 *            default: 1
 *          products:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id_product:
 *                  type: integer
 *                  example: 1
 *                amount: 
 *                  type: integer
 *                  example: 2
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *    tags:
 *    - "Pedidos"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un pedido en nuestra base de datos"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de pedido
 *      in: path
 *      required: false
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

module.exports = router;