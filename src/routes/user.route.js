const express = require('express');
const router = express.Router();
const functions = require('../controllers/user.controller');
const middlewareUser = require('../middlewares/user.middleware');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
  functions.listValues()
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

router.post("/", middlewareUser.searchUser , (req, res) => {
  functions.createUser(req)
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
  functions.updateUser(req)
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
  functions.deleteUser(req)
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
  functions.listUserById(req)
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
 * /users:
 *  get:
 *    tags:
 *    - "Usuarios" 
 *    summary: "Listado de todos los usuarios"
 *    description: Devuelve todos los usuarios dados de alta en nuestra app
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *  post:
 *    tags:
 *    - "Usuarios"
 *    summary: "Agrega Usuario"
 *    description: Guarda un nuevo usuario en nuestra app
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      example: daveG
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *      example: Fulanito Gomez
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      example: fulanito1@gmail.com
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *      example: 542964444111
 *    - name: address
 *      description: Domicilio de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      example: Calle False 123
 *    - name: password
 *      description: Contraseña de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      example: 146bea927a6743c026f4084b061d3c1c 
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags:
 *    - "Usuarios"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificación en uno o mas campos de un usuario"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
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


/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *    - "Usuarios"
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un usuario
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
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

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *    - "Usuarios"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un usuario en nuestra base de datos"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *    - name: id
 *      description: Id de Usuario
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

module.exports = router;