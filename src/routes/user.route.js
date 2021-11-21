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
  functions.createUserTransaction(req)
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
 *      description: token de autorizacion para acceder a la operacion. bearer {hash}
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
 *      default: bearer [hash]
 *    - name: nickname
 *      description: Nombre de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      default: usuario1
 *    - name: completeName
 *      description: Nombre del propietario de la cuenta 
 *      in: formData
 *      required: true
 *      type: string
 *      default: fulanito
 *    - name: email
 *      description: Correo electronico de Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      default: fulanito123@gmail.com
 *    - name: phone
 *      description: Numero de telefono de Usuario 
 *      in: formData
 *      required: true
 *      type: integer
 *      default: 542964444111
 *    - name: password
 *      description: Contraseña de Usuario
 *      in: formData
 *      required: true
 *      type: string
 *      default: 12345
 *    - name: name
 *      description: Nombre del Domicilio del Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      default: Calle False
 *    - name: number
 *      description: Altura del Domicilio del Usuario 
 *      in: formData
 *      required: true
 *      type: string
 *      default: 123
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
 *      default: bearer
 *    - name: id
 *      description: Id de Usuario
 *      in: path
 *      required: true
 *      type: integer
 *      default: 2
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
 *    - name: password
 *      description: Contraseña de Usuario. En esta API de pruebas, todas las contraseñas son "12345"
 *      in: formData
 *      required: false
 *      type: string
 *    - name: id_user_state
 *      description: Id del estado del Usuario 
 *      in: formData
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
 *      default: bearer
 *    - name: id
 *      description: Id de Usuario
 *      in: path
 *      required: true
 *      type: integer
 *      default: 10
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
 *      default: bearer
 *    - name: id
 *      description: Id de Usuario
 *      in: path
 *      required: true
 *      type: integer
 *      default: 10
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

module.exports = router;