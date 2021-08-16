const moment = require('moment');
const express = require('express');
const app = express();

const router = express.Router();

/* app.use(router); */

const usuarios = require('./routes/usuarios');
app.use('/users', usuarios);

const pedidos = require('./routes/pedidos');
app.use('/orders', pedidos);

const productos = require('./routes/productos');
app.use('/products', productos);


/* const { json } = require('express'); */

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* ------------------------------------------- */
/* -------------- SWAGGER -------------------- */
/* ------------------------------------------- */

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
/* const users = require('./models/usuarios'); */


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '0.1.0'
    }
  },
  apis: ['./routes/usuarios.js', './routes/pedidos.js', './routes/productos.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/* const login = (username, password) => users.find(user => user.username === username && user.password === password);

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(login(username, password));
  res.json({msg: 'ok'});

}); */

router.use(function(req, res, next) {
  const respuesta = `404 Not Found ${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

module.exports = app;