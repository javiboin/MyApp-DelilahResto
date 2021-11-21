const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const productController = require("../controllers/product.controller");
const all = require('../middlewares/all.middleware');

router.get("/", (req, res) => {
  productController.getProducts()
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

router.post("/", all.isAdmin, (req, res) => {
  productController.createProduct(req)
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

router.put("/:id", all.isAdmin, (req, res) => {
  productController.updateProduct(req)
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

router.delete("/:id", all.isAdmin, (req, res) => {
  productController.deleteProduct(req)
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
  productController.listProductById(req)
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

// Cambiar en metodo de entrada del campo price,
// de string a float probar swagger
router.post('/', function (req, res){
  if (administradores.isAdmin(req.body.idUser_Session)){
    let respuesta = {};
    respuesta.msg = functions.crearProduct(req.body);
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

router.put('/:id', function (req, res){
  if (administradores.isAdmin(req.body.idUser_Session)){
    const idProduct = req.params.id;
    const respuesta = {};
    respuesta.msg = functions.filterProducts(idProduct) ? functions.modificarProduct(idProduct, req.body) : "Operación anulada. El producto no existe";
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

router.get('/:id', function (req, res){
    const idProduct = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterProducts(idProduct) ? functions.filterProducts(idProduct) : "El producto no existe";
    res.json(respuesta);
});

router.delete('/:id', function (req, res){
  if (administradores.isAdmin(req.body.idUser_Session)){
    const idProduct = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterProducts(idProduct) ? functions.borrarProduct(idProduct) : "Operación anulada. El producto no existe";
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *    - "Productos"
 *    summary: "Listado de todos los productos"
 *    description: Devuelve todos los productos en nuestra app
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
 *      404:
 *        description: Not found
 */

/**
 * @swagger
 * /products:
 *  post:
 *    tags:
 *    - "Productos"
 *    summary: "Agrega Producto"
 *    description: Guarda un nuevo producto en nuestra app
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer 
 *    - name: name
 *      description: Nombre del producto
 *      in: formData
 *      required: true
 *      type: string
 *      example: Lomo Completo
 *    - name: price
 *      description: Precio del producto
 *      in: formData
 *      required: true
 *      type: number
 *      example: 100.00
 *    - name: pic
 *      description: Imagen de referencia
 *      in: formData
 *      required: true
 *      type: string
 *      default: https://i.imgur.com/oFVYR34.jpeg
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
 * /products/{id}:
 *  put:
 *    tags:
 *    - "Productos"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificacón en uno o más campos de un producto"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de producto
 *      in: path
 *      required: true
 *      type: integer
 *      default: 1
 *    - name: name
 *      description: Nombre del producto
 *      in: formData
 *      required: false
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: formData
 *      required: false
 *      type: number
 *    - name: pic
 *      description: Imagen de referencia
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
 * /products/{id}:
 *  get:
 *    tags:
 *    - Productos
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un producto
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de producto
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
 * /products/{id}:
 *  delete:
 *    tags:
 *    - "Productos"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un producto en nuestra base de datos"
 *    parameters:
 *    - name: authorization
 *      description: token de autorizacion para acceder a la operacion 
 *      in: header
 *      required: false
 *      type: string
 *      example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImRhdmVHIiwicGFzc3dvcmQiOiIxNDZiZWE5MjdhNjc0M2MwMjZmNDA4NGIwNjFkM2MxYyIsImlkX3VzZXJfc3RhdGUiOjEsImlhdCI6MTYzNjA3OTA4MCwiZXhwIjoxNjM2MDgyNjgwfQ.s-y0FRh4ebdMAhgAsb7mW7Bt1UQ1UZ09z0-t9QYpYPA
 *      default: bearer
 *    - name: id
 *      description: Id de producto
 *      in: path
 *      required: true
 *      type: integer
 *      default: 2
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */

module.exports = router;
