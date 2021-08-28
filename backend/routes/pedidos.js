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
 * /users/{id}:
 *  put:
 *    tags:
 *    - "Usuarios"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificación en uno o mas campos de un usuario"
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idUser_Session
 *      description: ID de usuario que realiza el cambio 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: false
 *      type: string
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: false
 *      type: string
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: false
 *      type: string
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: address
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: false
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
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
router.put('/changeStateOrder/:id', function (req, res){
  if (administradores.isAdmin(req.body.idUser)){
    const id = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterOrders(id) ? functions.modificarOrder(id ,req.body) : "No existe el pedido que estabas buscando";
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
    let resultado = functions.filterOrders(req.params.idUser);

    if (resultado.length === 0){ resultado = 'El usuario no ha realizado pedidos aún'}
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

router.put('/:id', function (req, res){
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
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.delete('/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders ? functions.borrarOrder(idOrders) : "no es correcto";
  res.json(respuesta);
});

module.exports = router;
