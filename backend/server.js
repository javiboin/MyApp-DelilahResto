require('dotenv').config();

const morgan = require('morgan');

const jwt = require('jsonwebtoken');

const helmet = require("helmet");

const userInfo = {nickname: "Javier", password: 31};
const signature = process.env.JWT_SECRET;
const token = jwt.sign(userInfo, signature);
console.log(token);

const decoded = jwt.verify(token, signature);
console.log(decoded);

const redis = require('redis');
const fetch = require('node-fetch');

const express = require('express');

const moment = require('moment');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(helmet());

/* ------------------------------------------------------------ */
/* JWT */
app.post('/api/login', (req, res) => {
  const reqprueba = req.body;
  console.log(reqprueba);

  const user = {id: 2, nombre: "JavierO", edad: 31};
  const signature = process.env.JWT_SECRET;
  const token = jwt.sign(user, signature);
  // funciona ahora llevarlo al login origininal de usuarios

  console.log(token)
  res.json({ token });
});

app.get('/api/protected', ensureToken, (req, res) => {
  jwt.verify(req.token, signature, (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        text: 'protected', 
        data
      });
    }
  })
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  console.log('aca');

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    
  } else {
    /* res.sendStatus(403); */
  }
  next(); 
};

/* ------------------------------------------------------------ */
/* REDIS */
const redisClient = redis.createClient();

redisClient.on('err', err => { console.log(err) });

const cacheCharacter = (req, res, next) => {
  const { character } = req.params;
  redisClient.get(character, (err, data) => {
    if (err) throw err;
    if (data) {
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

async function getPostRickAndMorty(req, res) {
  const { character } = req.params;

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${character}`);
    const data = await response.json();

    let infoCharacter = [];
    
    infoCharacter.push(data);

    redisClient.setex(character, 30, JSON.stringify(infoCharacter));
    return res.json(infoCharacter);
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
}

app.get('/post/:character', cacheCharacter, getPostRickAndMorty);

/* ------------------------------------------------------------ */

app.use(require('./controllers/auth.controller'));

/* -------------- IMPORTAR RUTAS -------------------- */

const addresses = require('./routes/address.route');
app.use('/addresses', addresses);

const orders = require('./routes/order.route');
app.use('/orders', orders);

const ordersDetail = require('./routes/orderDetail.route');
app.use('/orders-detail', ordersDetail);

const orderStates = require('./routes/orderState.route');
app.use('/order-states', orderStates);

const paymentMethods = require('./routes/paymentMethod.route');
app.use('/payment-methods', paymentMethods);

const products = require('./routes/product.route');
app.use('/products', products);

const productStates = require('./routes/productState.route');
app.use('/product-states', productStates);

const users = require('./routes/user.route');
app.use('/users', users);

const userAddress = require('./routes/userAddress.route');
app.use('/user-address', userAddress);

const userStates = require('./routes/userState.route');
app.use('/user-states', userStates);

const userSuspensions = require('./routes/userSuspension.route');
app.use('/user-suspensions', userSuspensions);

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
  apis: [
    './routes/user.route.js'
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* -------------- ENDPOINT GENERAL -------------------- */
app.use(function(req, res, next) {
  console.log(req.params);
  const respuesta = `${moment().format('DD-MM-YYYY, hh:mm:ss a')} ${req.method} ${req.url} path: ${req.path} ${req.statusCode} ${req.statusMessage}}`;
  
  res.json(respuesta);
  console.log(respuesta);

  next();
});

app.use('/', express.static('/backend/public/index.html')); /* no funciona */

module.exports = app;