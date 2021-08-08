/* ---------------- AJUSTES SERVIDOR ---------------- */

const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

app.use(router);


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
  res.send('Listando Usuarios');
});

router.post('/users', function (req, res){
  res.send('Añadiendo Usuarios');
});

router.put('/users', function (req, res){
  res.send('Modificando Usuarios');
});

router.delete('/users', function (req, res){
  res.send('Eliminando Usuarios');
});

/* ---------------- PEDIDOS ---------------- */

router.get('/orders', function (req, res){
  res.send('Listando pedidos');
});

router.post('/orders', function (req, res){
  res.send('Añadiendo pedidos');
});

router.put('/orders', function (req, res){
  res.send('Modificando pedidos');
});

router.delete('/orders', function (req, res){
  res.send('Eliminando pedidos');
});

/* ---------------- PRODUCTOS ---------------- */

router.get('/products', function (req, res){
  res.send('Listando Pedidos');
});

router.post('/products', function (req, res){
  res.send('Añadiendo Pedidos');
});

router.put('/products', function (req, res){
  res.send('Modificando Pedidos');
});

router.delete('/products', function (req, res){
  res.send('Eliminando Pedidos');
});

router.use('/', function(req, res){
  res.send('Hora local');
});

app.listen(port, () => console.log("http://localhost:" + port));

