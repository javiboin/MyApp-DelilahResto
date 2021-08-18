const express = require('express');
const router = express.Router();
const administradores = require('../controllers/administradores');
const functions = require('../controllers/metodosPago');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', function (req, res){
  let respuesta = {};
  respuesta.msg = functions.listPayment();
  res.json(respuesta);
});

module.exports = router;