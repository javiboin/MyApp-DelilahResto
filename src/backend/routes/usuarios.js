const express = require('express');
const router = express.Router();
const functions = require('../functions');

router.get('/filterUsers', function (req, res){
  res.send(functions.filterUsers(1));
});

/**
 * @swagger
 * /users:
 *  get:
 *    description: Listado de todos los usuarios
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/', function (req, res){
  let respuesta = {};
  console.log("BREAKPOINT router get");
  respuesta.msg = functions.listUsers();
  res.json(respuesta);
});
/**
 * @swagger
 * /users:
 *  post:
 *    description: Crea un Usuario
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: mainAddress
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: altAddress
 *      description: Domicilio alternativo o transitorio 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 */

router.post('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearUser(req.body);
  res.json(respuesta);
  console.log(req.body);
  res.status(201).send({error: '', body: 'Creado Correctamente'});
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Modifica un Usuario
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: mainAddress
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: altAddress
 *      description: Domicilio alternativo o transitorio 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 */

 router.put('/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterUsers(idUser) ? 
  functions.modificarUser(idUser,req.body) : `ese autor no existe, puede ver todos los autores en ${url}/autores`;
  res.json(respuesta);
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Modifica un Usuario
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: mainAddress
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: altAddress
 *      description: Domicilio alternativo o transitorio 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 */

router.get('/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterUsers(idUser) ? functions.userID(idUser) : "no es correcto";
  res.json(respuesta); 
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Modifica un Usuario
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: mainAddress
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: altAddress
 *      description: Domicilio alternativo o transitorio 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 */
router.delete('/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterUsers(idUser) ? functions.borrarUser(idUser) : "no es correcto";
  res.json(respuesta);
});

module.exports = router;