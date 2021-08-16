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

router.use(function(req, res, next) {
  const respuesta = `404 Not Found ${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

module.exports = app;