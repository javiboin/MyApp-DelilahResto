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

router.post('/', function (req, res){
  if (administradores.isAdmin(req.body.idUser)){
    let respuesta = {};
    respuesta.msg = functions.crearMedioPago(req.body);
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. NO cuenta con los permisos para realizar esta acción");
  };
});

router.put('/:id', function (req, res){
  if (administradores.isAdmin(req.body.idUser)){
    const idPayment = req.params.id;
    const respuesta = {};

    respuesta.msg = functions.filterPayment(idPayment) ? functions.modificarPayment(idPayment, req.body) : "Operación anulada. El producto no existe";
    res.json(respuesta); 
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

router.delete('/:id', function (req, res){
  if (administradores.isAdmin(req.body.idUser)){
    const idPayment = req.params.id;
    let respuesta = {};
    respuesta.msg = functions.filterPayment(Payment) ? functions.borrarPayment(idPayment) : "Operación anulada. El metodo de pago no existe";
    res.json(respuesta);
  } else {  
    res.json("Operación anulada. No cuenta con los permisos para realizar esta acción");
  };
});

module.exports = router;