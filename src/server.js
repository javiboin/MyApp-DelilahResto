/* ---------------- AJUSTES SERVIDOR ---------------- */
const moment = require('moment');
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

app.use(router);

const data = require('./data');

/* ------------------------------------------- */
/* -------------- FUNCIONALIDADES ------------ */
/* ------------------------------------------- */

/* CUENTA NUEVA ALTA DE USUARIO */
/* INGRESAR CON USUARIO Y CONTRASEÑA */
/* GENERAR UN CARRITO DE COMPRAS CON EL USUARIO REGISTRADO */
/* INSTANCIAR OBJETO PEDIDO */
/* EDITAR ESTADO DEL OBJETO PEDIDO DESDE EL ADMIN */
/* LISTAR OBJETOS POR ESTADO */



/* ------------------------------------------- */
/* ---------------- ENDPOINTS ---------------- */
/* ------------------------------------------- */

/* ---------------- USUARIOS ---------------- */

router.get('/users', function (req, res){
  res.send(data.listUsers());
});

router.post('/users', function (req, res){
  res.send(data.crearUser());
});

router.put('/users', function (req, res){
  res.send(data.modificarUser(1, "JAVIBOIN", "Javier de los Angeles","javi3000@gmail.com", 542964123256, "Garibaldi 203",null,1234));
});

router.delete('/users', function (req, res){
  res.send(data.borrarUser());
});

/* ---------------- PEDIDOS ---------------- */

router.get('/orders', function (req, res){
  res.send(data.listOrders());
});

router.post('/orders', function (req, res){
  res.send(data.crearOrder());
});

router.put('/orders', function (req, res){
  res.send(data.modificarOrder(1,"Confirmado",[2,3],400));
});

router.delete('/orders', function (req, res){
  res.send(data.borrarOrder());
});

/* ---------------- PRODUCTOS ---------------- */

router.get('/products', function (req, res){
  res.send(data.listProducts());
});

router.post('/products', function (req, res){
  res.send(data.crearProduct());
});

router.put('/products', function (req, res){
  res.send(data.modificarProduct(1,"Bife con Cebolla", 250, "pic"));
});

router.delete('/products', function (req, res){
  res.send(data.borrarProduct());
});

router.use('/', function(req, res){
  res.send(moment().format('DD/MM/YYYY, hh:mm:ss a')); 
  /*  usar para log y usar para pedidos */ 
  console.log(`la hora en unix es: ${Date.now()}`);
});

app.listen(port, () => console.log("http://localhost:" + port));

