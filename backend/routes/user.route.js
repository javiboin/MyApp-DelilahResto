const express = require('express');
const router = express.Router();
const functions = require('../controllers/usuarios');
/* const administradores = require('../controllers/administradores'); */

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* const isAdmin = (req, res, next) => {
  const bearer = req.headers.authorization.replace('Bearer ','');
  const token = bearer.replace('Bearer ','');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  decoded.user === 'admin' ? next() : res.status(401).send('Unauthorized');
} */

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *    - "Usuarios"
 *    summary: "Ingresa a nuestra app"
 *    description: Autentica el ingreso a la app
 *    parameters:
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de usuario
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
router.post('/login', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.login(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *    - "Usuarios" 
 *    summary: "Listado de todos los usuarios"
 *    description: Devuelve todos los usuarios dados de alta en nuestra app
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.get('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listUsers();
  res.json(respuesta);
});

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *    - "Usuarios"
 *    summary: "Agrega Usuario"
 *    description: Guarda un nuevo usuario en nuestra app
 *    parameters:
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
 *    - name: address
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.post('/', function (req, res){
  if (functions.emailrepetido(req.body.email)){
    res.json("Operación anulada. El email ingresado ya esta registrado");
  } else {  
    let respuesta = {};
    respuesta.msg = functions.crearUser(req.body);
    res.json(respuesta);
  };
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

router.put('/:id', function (req, res){
  const idUser = req.params.id;
  const idUser_Session = req.body.idUser_Session;

  let respuesta = {}; 

  if (idUser == idUser_Session){
    respuesta.msg = functions.filterUsers(idUser) ? 
    functions.modificarUser(idUser,req.body) : `El usuario no existe, Intentelo denuevo`;
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *    - "Usuarios"
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un usuario
 *    parameters:
 *    - name: id
 *      description: Id de Usuario
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

router.get('/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};

  let objetoUser = functions.filterUsers(idUser);

  respuesta.msg = objetoUser.length !== 0 ? objetoUser : "El usuario no existe, Intentelo denuevo";

  res.json(respuesta); 
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *    - "Usuarios"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un usuario en nuestra base de datos"
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
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.delete('/:id', function (req, res){
  const idUser = req.params.id;
  const idUser_Session = req.body.idUser_Session;

  let respuesta = {};

  if (idUser == idUser_Session){
    respuesta.msg = functions.filterUsers(idUser) ? functions.borrarUser(idUser) : "El usuario no existe, Intentelo denuevo";
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

module.exports = router;