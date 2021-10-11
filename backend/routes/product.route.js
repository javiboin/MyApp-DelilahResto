const express = require('express');
const router = express.Router();
const functions = require('../controllers/productos');
/* const administradores = require('../controllers/administradores'); */

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const productController = require("../controllers/product.controller");

router.get("/", (req, res) => {
  productController.listValues()
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

/**
 * @swagger
 * /products/menu:
 *  get:
 *    tags:
 *    - "Productos"
 *    summary: "Listado de todos los productos"
 *    description: Devuelve todos los productos en nuestra app
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */
router.get('/menu', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listProducts();
  res.json(respuesta);
});

/**
 * @swagger
 * /products:
 *  post:
 *    tags:
 *    - "Productos"
 *    summary: "Agrega Producto"
 *    description: Guarda un nuevo producto en nuestra app
 *    parameters:
 *    - name: idUser_Session
 *      description: ID de usuario que realiza el cambio 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
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
  if (administradores.isAdmin(req.body.idUser_Session)){
    let respuesta = {};
    respuesta.msg = functions.crearProduct(req.body);
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    tags:
 *    - "Productos"
 *    summary: "Modifica por ID"
 *    description: "Se realiza la modificacón en uno o más campos de un producto"
 *    parameters:
 *    - name: idUser_Session
 *      description: ID de usuario que realiza el cambio 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id
 *      description: Id de producto
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: formData
 *      required: false
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: formData
 *      required: false
 *      type: integer
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

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    tags:
 *    - Productos
 *    summary: "Ver info por ID"
 *    description: Todos los datos de un producto
 *    parameters:
 *    - name: id
 *      description: Id de producto
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
    const idProduct = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterProducts(idProduct) ? functions.filterProducts(idProduct) : "El producto no existe";
    res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    tags:
 *    - "Productos"
 *    summary: "Elimina por ID"
 *    description: "Se elimina un producto en nuestra base de datos"
 *    parameters:
 *    - name: idUser_Session
 *      description: ID de usuario que realiza el cambio 
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id
 *      description: Id de producto
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

module.exports = router;
