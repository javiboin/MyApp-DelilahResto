const express = require('express');
const router = express.Router();
const functions = require('../controllers/pedidos');
const functionsUser = require('../controllers/usuarios');
const administradores = require('../controllers/administradores');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
 *    - name: idUser
 *      description: ID de Usuario que realizo el pedido 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: products
 *      description: Listado de productos en el pedido 
 *      in: body
 *      required: true
 *      type: array
 *    - name: formaPago
 *      description: Metodos de pago 
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.post('/', function (req, res){
  console.log(req.body);
/*   let respuesta = {};
  respuesta.msg = functions.crearOrder(req.body);
  res.json(respuesta); */
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
    respuesta.msg = functions.confirmarPedido(req.params.id);
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
 * /orders/modificar-pedido/{id}:
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
 *    - name: idUser
 *      description: ID de Usuario que realizo el pedido 
 *      in: formData
 *      required: true
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
 *    - name: state
 *      description: Estado del pedido 
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.put('/modificar-pedido/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders(idOrders) ? functions.modificarOrder(idOrders ,req.body) : "no es correcto";
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