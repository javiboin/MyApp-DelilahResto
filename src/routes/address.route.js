const express = require('express')
const router = express.Router()

const addressController = require("../controllers/address.controller");

router.get("/", (req, res) => {
  addressController.listValues()
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
  addressController.createAddress(req)
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
  addressController.updateAddress(req)
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
  addressController.deleteAddress(req)
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
  addressController.listAddressById(req)
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
  addressController.listAddressByUser(req)
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
 * /addresses:
 *  get:
 *    tags:
 *    - "Domicilios" 
 *    summary: "Listado de todos Domicilios"
 *    description: Devuelve todos los domicilios disponibles
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
 * /addresses/{id}:
 *  get:
 *    tags:
 *    - "Domicilios"
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un domicilio
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de domicilio
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
 * /addresses/byuser/{id_user}:
 *  get:
 *    tags:
 *    - "Domicilios"
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un domicilio
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id_user
 *      description: Id de domicilio
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
 * /addresses/{id}:
 *  put:
 *    tags:
 *    - "Domicilios"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificacón en uno o más campos de un domicilio"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de la direccion
 *      in: path
 *      required: true
 *      type: integer
 *      default: 1
 *    - name: name
 *      description: Nombre de la calle
 *      in: formData
 *      required: false
 *      type: string
 *    - name: number
 *      description: Altura de la calle
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
 * /addresses/{id}:
 *  delete:
 *    tags:
 *    - "Domicilios"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un domicilio en nuestra base de datos"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de la direccion
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