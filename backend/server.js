/* require('dotenv').config();
const jwt = require('jsonwebtoken');
const helmet = require("helmet"); */
const express = require('express');

const moment = require('moment');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* app.use(helmet()); */

const router = express.Router();

/* -------------- IMPORTAR RUTAS -------------------- */
const usuarios = require('./routes/usuarios');
app.use('/users', usuarios);

const pedidos = require('./routes/pedidos');
app.use('/orders', pedidos);

const productos = require('./routes/productos');
app.use('/products', productos);


/* ------------------------------------------------------------ */

const estados = require('./routes/state.route');
app.use('/states', estados);

const pagos = require('./routes/payment.route');
app.use('/payments', pagos);

const administradores = require('./routes/administrators.route');
app.use('/administrators', administradores);

app.use(require('./controllers/auth.controller'));

/* -------------------------------------- */

/* const isAdmin = (req, res, next) => {
  const bearer = req.headers.authorization.replace('Bearer ','');
  const token = bearer.replace('Bearer ','');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  decoded.user === 'admin' ? next() : res.status(401).send('Unauthorized');
} */








/* -------------- SWAGGER CONFIGURATION -------------------- */
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '1.0.1'
    }
  },
  apis: ['./routes/usuarios.js', './routes/pedidos.js', './routes/productos.js','./routes/metodosPago.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* -------------- ENDPOINT GENERAL -------------------- */
router.use(function(req, res, next) {
  const respuesta = `${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

module.exports = app;