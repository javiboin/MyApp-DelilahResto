const express = require('express');
const router = express.Router();
const functions = require('../controllers/pedidos');
const functionsUser = require('../controllers/user.controller');
/* const administradores = require('../controllers/administradores'); */

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const OrderController = require("../controllers/order.controller");

router.get("/", (req, res) => {
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
  OrderController.createOrder(req)
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

router.put("/:id",(req, res) => {
  OrderController.updateOrder(req)
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

router.delete("/:id", (req, res) => {
  OrderController.deleteOrder(req)
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

/**
 * @swagger
 * /orders/all/{idSession}:
 *  get:
 *    tags:
 *    - "Pedidos" 
 *    summary: "Listado de todos los Pedidos"
 *    description: Devuelve todos los pedidos realizados solo para Usuarios Administradores
 *    parameters:
 *    - name: idSession
 *      description: Id del Usuario que inicio la session
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.get('/all/:idSession', function (req, res){
  if (administradores.isAdmin(req.params.idSession)){
    let respuesta = {};
    respuesta.msg = functions.listOrders();
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /orders/byuser/{idUser}:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: Listado de todos los pedidos que realizo un usuario
 *    description: Encuentra tu historial de pedidos realizados
 *    parameters:
 *    - name: idUser
 *      description: ID de usuario 
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */
router.get('/byuser/:idUser', function (req, res){
  let respuesta = {};
  let resultado = functions.filterOrdersxId(req.params.idUser);

  if (resultado.length === 0){ resultado = 'El usuario no ha realizado pedidos aún'}
  respuesta.msg = resultado;

  res.json(respuesta);
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    tags:
 *    - "Pedidos"
 *    summary: "Ver info de pedidos por ID"
 *    description: Todos los datos de un pedido
 *    parameters:
 *    - name: id
 *      description: ID del pedido
 *      in: path
 *      required: false
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.get('/:id', function (req, res){
  let respuesta = {};
  let resultado = functions.traerPedido(req.params.id);

  if (resultado === undefined){ resultado = 'El pedido no existe'}
  respuesta.msg = resultado;

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
 *    - in: body
 *      name: orders
 *      required: false
 *      description : Listado de productos en el pedido 
 *      schema:
 *        type: object
 *        properties:
 *          idUser:
 *            type: number
 *            example: 1 
 *          products:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  example: 1
 *                cant: 
 *                  type: number
 *                  example: 1
 *          payment:
 *            type: number
 *            example: 1 
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

router.post('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearOrder(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /orders/confirmar-pedido/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Confirmar Pedido por ID"
 *    description: "Se realiza la modificación en uno o mas campos de un usuario"
 *    parameters:
 *    - name: id
 *      description: ID del Pedido
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idUser_Session
 *      description: ID de usuario o administrador que realiza el cambio de estado
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: address
 *      description: Direccion alternativa, si se deja vacio se guardara la direccion que guardaste en tu perfil
 *      in: formData
 *      required: false
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.put('/confirmar-pedido/:id', function (req, res){ 
  let pedido = functions.traerPedido(req.params.id);
  let respuesta = {};
  if (pedido.state == 0 && req.body.idUser_Session == pedido.idUser){
    respuesta.msg = functions.confirmarPedido(req.params.id, req.body.address);
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción"); 
}});

/**
 * @swagger
 * /orders/estado-byadmin/{id}:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Modifica Estados del pedido "
 *    description: "Se realiza la modificación del estado del pedido por administradores"
 *    parameters:
 *    - name: id
 *      description: ID del pedido
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idUser_Session
 *      description: ID del administrador que realiza el cambio de estado 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: state
 *      description: Actualiza el Estado del pedido
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.put('/estado-byadmin/:id', function (req, res){
  /* 
  verifico la existencia del pedido
  verifico que le usuario es administrador, para realizar el cambio de estado
   */
  let pedido = functions.traerPedido(req.params.id);
  let respuesta = {};

  if (administradores.isAdmin(req.body.idUser_Session)){
    if (pedido.state > 0){
      respuesta.msg = functions.modificarEstadoDePedido(req.params.id, req.body.state);
      res.json(respuesta); 
    } else {  
      res.json("Operación anulada. No cuenta con los permisos para realizar esta acción")};
    } else {  
      res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
    };
});

/**
 * @swagger
 * /orders/modificar-pedido:
 *  put:
 *    tags:
 *    - "Pedidos"
 *    summary: "Modifica Pedido"
 *    description: Modificar varios campos de un pedido. Operacion para administradores
 *    parameters: 
 *    - in: body
 *      name: orders
 *      required: false
 *      description : Listado de productos en el pedido 
 *      schema:
 *        type: object
 *        properties:
 *          idSession:
 *            type: number
 *            example: 1 
 *          id:
 *            type: number
 *            example: 1 
 *          idUser:
 *            type: number
 *            example: 2 
 *          state:
 *            type: number
 *            example: 2 
 *          products:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  example: 3
 *                cant: 
 *                  type: number
 *                  example: 3
 *          payment:
 *            type: number
 *            example: 1 
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

router.put('/modificar-pedido', function (req, res){
  const idOrders = req.body.id;
  let respuesta = {};

  /* 
  Validamos que se pueda modificar un pedido en los siguientes casos:
    - Un Usuario que quiera modificar su pedido, SOLO si éste no esta confirmado
    - Un Administrador pueda realizar cambios al pedido SOLO si esta confirmado por el usuario que creo el pedido
   */
  if ((req.body.state == 0 && req.body.idSession == req.body.idUser) || (req.body.state > 0 && administradores.isAdmin(req.body.idSession))){
    respuesta.msg = functions.filterOrders(idOrders) ? functions.modificarOrder(idOrders ,req.body) : "El pedido no existe";
    
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
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
 *      in: path
 *      required: false
 *      type: integer
 *    - name: idUser_Session
 *      description: ID de Usuario que realizo el pedido 
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

router.delete('/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};

  if (administradores.isAdmin(req.body.idUser_Session)){
    respuesta.msg = functions.filterOrders ? functions.borrarOrder(idOrders) : "no es correcto";
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

module.exports = router;