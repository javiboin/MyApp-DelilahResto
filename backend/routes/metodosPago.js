const express = require('express');
const router = express.Router();
const administradores = require('../controllers/administradores');
const functions = require('../controllers/metodosPago');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**
 * @swagger
 * /payment/{idSession}:
 *  get:
 *    tags:
 *    - "Medios de Pago" 
 *    summary: "Listado de todos Medios de Pago"
 *    description: Devuelve todos los medios de pago disponibles solo para Usuarios Administradores
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
router.get('/:idSession', function (req, res){
  let administrador = req.params.idSession;

  if (administradores.isAdmin(administrador)){
    let respuesta = {};
    respuesta.msg = functions.listPayment();
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. NO cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /payment:
 *  post:
 *    tags:
 *    - "Medios de Pago" 
 *    summary: "Crear nuevos medios de pago"
 *    description: Crear nuevos medios de pago disponibles solo para Usuarios Administradores
 *    parameters:
 *    - name: idSession
 *      description: ID de usuario administrador que realiza el nuevo medio de pago
 *      in: formData
 *      required: true
 *      type: number
 *    - name: name
 *      description: Nombre del medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.post('/', function (req, res){
  let administrador = req.body.idSession;

  if (administradores.isAdmin(administrador)){
    let respuesta = {};
    respuesta.msg = functions.crearMedioPago(req.body);
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. NO cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /payment/{id}:
 *  put:
 *    tags:
 *    - "Medios de Pago" 
 *    summary: "Modificar Medios de pago"
 *    description: Modificar medios de pago disponibles solo para Usuarios Administradores
 *    parameters:
 *    - name: id
 *      description: ID de pedido
 *      in: path
 *      required: true
 *      type: number
 *    - name: idSession
 *      description: ID de usuario administrador que realiza el nuevo medio de pago
 *      in: formData
 *      required: true
 *      type: number
 *    - name: name
 *      description: Nombre del medio de pago
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.put('/:id', function (req, res){
  if (administradores.isAdmin(req.body.idSession)){
    const idPayment = parseInt(req.params.id);
    const respuesta = {};

    respuesta.msg = functions.filterPayment(idPayment) ? functions.modificarPayment(idPayment, req.body) : "Operación anulada. El producto no existe";
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /payment/{id}:
 *  delete:
 *    tags:
 *    - "Medios de Pago"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un medio de pago en nuestra base de datos"
 *    parameters:
 *    - name: id
 *      description: ID de Medio de Pago
 *      in: path
 *      required: false
 *      type: integer
 *    - name: idSession
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
  if (administradores.isAdmin(req.body.idSession)){
    const idPayment = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterPayment(idPayment) ? functions.borrarPayment(idPayment) : "Operación anulada. El metodo de pago no existe";
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

module.exports = router;