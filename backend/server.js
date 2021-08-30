const moment = require('moment');
const express = require('express');
const app = express();

app.use(express.json());

const router = express.Router();

/* -------------- IMPORTAR RUTAS -------------------- */
const usuarios = require('./routes/usuarios');
app.use('/users', usuarios);

const pedidos = require('./routes/pedidos');
app.use('/orders', pedidos);

const productos = require('./routes/productos');
app.use('/products', productos);

const metodosDePago = require('./routes/metodosPago');
app.use('/payment', metodosDePago);

/* -------------- SWAGGER CONFIGURATION -------------------- */
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '1.0.0'
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