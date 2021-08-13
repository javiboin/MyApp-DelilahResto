/* ---------------- AJUSTES SERVIDOR ---------------- */
const moment = require('moment');
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3001;
const host = 'http://localhost'
const url = `${host}:${PORT}`;

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

router.get('/filterUsers', function (req, res){
  res.send(functions.filterUsers(1));
});

const login = (username, password) => users.find(user => user.username === username && user.password === password);

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(login(username, password));
  res.json({msg: 'ok'});

});

/* ---------------- USUARIOS ---------------- */

router.get('/users', function (req, res){
  res.json(functions.listUsers());
});

router.post('/users', function (req, res){
  res.json(functions.crearUser());
});

router.put('/users', function (req, res){
  res.json(functions.modificarUser(2, "JAVIBOIN", "Javier de los Angeles","javi3000@gmail.com", 542964123256, "Garibaldi 203",null,1234));
});

router.delete('/users', function (req, res){
  res.json(functions.borrarUser());
});

/* ---------------- PEDIDOS ---------------- */

router.get('/orders', function (req, res){
  res.json(functions.listOrders());
});

router.post('/orders', function (req, res){
  res.json(functions.crearOrder());
});

router.put('/orders', function (req, res){
  res.json(functions.modificarOrder(1,"Confirmado",[2,3],"Efectivo",400));
});

router.delete('/orders', function (req, res){
  res.json(functions.borrarOrder());
});

/* ---------------- PRODUCTOS ---------------- */

router.get('/products', function (req, res){
  res.json(functions.listProducts());
});

router.post('/products', function (req, res){
  res.json(functions.crearProduct());
});

router.put('/products', function (req, res){
  res.json(functions.modificarProduct(1,"Bife con Cebolla", 250, "pic"));
});

router.delete('/products', function (req, res){
  res.json(functions.borrarProduct());
});


router.use(function(req, res, next) {
  const respuesta = `404 Not Found ${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

app.listen(PORT, () => console.log(`Listen on ${url}`));

