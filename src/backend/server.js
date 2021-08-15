/* ---------------- AJUSTES SERVIDOR ---------------- */
const moment = require('moment');
const express = require('express');
const app = express();

const router = express.Router();

app.use(router);

const functions = require('./functions');
const usuarios = require('./models/usuarios');
const { json } = require('express');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* ------------------------------------------- */
/* -------------- SWAGGER ------------ */
/* ------------------------------------------- */

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const users = require('./models/usuarios');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '0.1.0'
    }
  },
  apis: ['./server.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/* CUENTA NUEVA ALTA DE USUARIO */
/* INGRESAR CON USUARIO Y CONTRASEÑA */
/* GENERAR UN CARRITO DE COMPRAS CON EL USUARIO REGISTRADO */
/* INSTANCIAR OBJETO PEDIDO */
/* EDITAR ESTADO DEL OBJETO PEDIDO DESDE EL ADMIN */
/* LISTAR OBJETOS POR ESTADO */



/* ------------------------------------------- */
/* ---------------- ENDPOINTS ---------------- */
/* ------------------------------------------- */

const login = (username, password) => users.find(user => user.username === username && user.password === password);

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(login(username, password));
  res.json({msg: 'ok'});

});

/* ---------------- USUARIOS ---------------- */
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
router.get('/users', function (req, res){
  let respuesta = {};
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

router.post('/users', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearUser(req.body);
  res.json(respuesta);
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

router.put('/users/:id', function (req, res){
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

router.get('/users/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterUsers(idUser) ? functions.userID(idUser) : "no es correcto";
  res.json(respuesta); 
});

router.delete('/users/:id', function (req, res){
  const idUser = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterUsers(idUser) ? functions.borrarUser(idUser) : "no es correcto";
  res.json(respuesta);
});

/* ---------------- PEDIDOS ---------------- */
/**
 * @swagger
 * /orders:
 *  get:
 *    description: Listado de todos los pedidos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/orders', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listOrders();
  res.json(respuesta);
});

/**
 * @swagger
 * /orders:
 *  post:
 *    description: Crea un pedido
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
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
 */
router.post('/orders', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearOrder(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /orders:
 *  put:
 *    description: Crea un pedido
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
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
 */

router.put('/orders/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders(idOrders) ? functions.modificarOrder(idOrders ,req.body) : "no es correcto";
  res.json(respuesta);
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    description: Crea un pedido
 *    parameters:
 *    - name: id
 *      description: Id de pedido
 *      in: formData
 *      required: false
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
 */

router.get('/orders/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders ? functions.orderID(idOrders) : "no es correcto";
  res.json(respuesta);
});

router.delete('/orders/:id', function (req, res){
  const idOrders = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterOrders ? functions.borrarOrder() : "no es correcto";
  res.json(respuesta);
});

/* ---------------- PRODUCTOS ---------------- */
/**
 * @swagger
 * /products:
 *  get:
 *    description: Listado de todos los productos
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/products', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listProducts();
  res.json(respuesta);
});

/**
 * @swagger
 * /products:
 *  post:
 *    description: Agrega un producto
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */
router.post('/products', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.crearProduct(req.body);
  res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    description: Agrega un producto
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */
router.put('/products/:id', function (req, res){
  const idProduct = req.params.id;
  const respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.modificarProduct(idProduct, req.body) : "no es permitido";
  res.json(respuesta);
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: Agrega un producto
 *    parameters:
 *    - name: id
 *      description: Id de producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: name
 *      description: Nombre del producto
 *      in: fromData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Precio del producto
 *      in: fromData
 *      required: true
 *      type: integer
 *    - name: pic
 *      description: Imagen de referencia
 *      in: fromData
 *      required: true
 *      type: string
 */

router.get('/products/:id', function (req, res){
  const idProduct = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.productID(idProduct) : "no es correcto";
  res.json(respuesta);
});

router.delete('/products/:id', function (req, res){
  const idProduct = req.params.id;
  let respuesta = {};
  respuesta.msg = functions.filterProducts(idProduct) ? functions.borrarProduct() : "no esta permitido";
  res.json(respuesta);
});


router.use(function(req, res, next) {
  const respuesta = `404 Not Found ${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

module.exports = app;
