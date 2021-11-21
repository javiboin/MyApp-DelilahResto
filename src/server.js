require('dotenv').config();
const morgan = require('morgan');
const helmet = require("helmet");
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(helmet());

/* -------------- IMPORTAR RUTAS -------------------- */
const all = require('./middlewares/all.middleware');

const login = require('./routes/login.route');
app.use('/login', login);

const addresses = require('./routes/address.route');
app.use('/addresses', all.access, addresses);

const orders = require('./routes/order.route');
app.use('/orders', all.access, orders);

const ordersDetail = require('./routes/orderDetail.route');
app.use('/orders-detail', all.access, ordersDetail);

const orderStates = require('./routes/orderState.route');
app.use('/order-states', all.access, orderStates);

const paymentMethods = require('./routes/paymentMethod.route');
app.use('/payment-methods', all.access, paymentMethods);

const products = require('./routes/product.route');
app.use('/products', all.access, products);

const productStates = require('./routes/productState.route');
app.use('/product-states', all.access, productStates);

const users = require('./routes/user.route');
app.use('/users', all.access, users);

const userAddress = require('./routes/userAddress.route');
app.use('/user-address', all.access, userAddress);

const userStates = require('./routes/userState.route');
app.use('/user-states', all.access, userStates);

const userSuspensions = require('./routes/userSuspension.route');
app.use('/user-suspensions', all.access, userSuspensions);

/* -------------- SWAGGER CONFIGURATION -------------------- */
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { token } = require('morgan');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '2.0.1'
    }
  },
  apis: [
    './src/routes/login.route.js', './src/routes/user.route.js',
    './src/routes/userAddress.route.js', './src/routes/userState.route.js', './src/routes/userSuspension.route.js', 
    './src/routes/product.route.js', './src/routes/productState.route.js',
    './src/routes/paymentMethod.route.js', './src/routes/address.route.js', 
    './src/routes/order.route.js', './src/routes/orderDetail.route.js',
    './src/routes/orderState.route.js'
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

try {
  app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocs)); 
} catch(error) {
  console.log(error);
}

/* -------------- ENDPOINT GENERAL -------------------- */
app.use(function(req, res, next) {
  console.log(req.params);
  const respuesta = `${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

//app.use('/', express.static('/backend/public/index.html')); /* no funciona */

module.exports = app;