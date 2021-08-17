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

/* -------------- SWAGGER CONFIGURATION -------------------- */
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '0.1.0'
    }
  },
  apis: ['./server.js','./routes/usuarios.js', './routes/pedidos.js', './routes/productos.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* -------------- ENDPOINT GENERAL -------------------- */
router.use(function(req, res, next) {
  const respuesta = `404 Not Found ${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

module.exports = app;