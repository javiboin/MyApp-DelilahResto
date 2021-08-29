const moment = require('moment');
const orders = require('../models/pedidos');
const users = require('../controllers/usuarios');
const states = require('../controllers/estados.js');
const payment = require('../controllers/metodosPago');
const products = require('../controllers/productos');

function verEstados(id){
  return orders.find(pedido => pedido.idUser === Number(id));
};


function traerPedido(id) {
  const datosFiltrados = orders.find(order => order.id == Number(id));

  return datosFiltrados;
};

function confirmarPedido(id){
  let pedido = traerPedido(id);
  
  pedido.state = 1;
  return pedido;
};

function modificarEstadoDePedido(id, estado){
  let pedido = traerPedido(id);
  
  pedido.state = parseInt(estado);
  return pedido;
};


function obtenerDatosProductos(productos) {
  listaDatosProductos = [];

  for (i = 0; i < productos.length; i++) {
    listaDatosProductos.push({
      id: productos[i].id,
      nombre: products.obtenerNombre(productos[i].id),
      precio: products.obtenerPrecio(productos[i].id)
    });
  };

  return listaDatosProductos;
};

function obtenerTotal(productos){
  sumaTotal = 0;

  for (i = 0; i < productos.length; i++) {
    sumaTotal = sumaTotal + products.obtenerPrecio(productos[i].id);
  };

  return sumaTotal;
};

function crearOrder(orderObject){
  let id = orders[orders.length -1].id +1;
  let dia = moment().format('DD-MM-YYYY');
  let hora = moment().format('hh:mm:ss a');

  let pedidoCargado = {
    Mensaje: 'Order created',
    ID: id,
    Usuario1: users.obtenerNickname(orderObject.idUser),
    Nombre1: users.obtenerNombre(orderObject.idUser),
    Estado1: states.obtenerNombre(1),
    Usuario: orderObject.idUser,
    Estado: 0,
    dia: moment().format('DD-MM-YYYY'),
    hora: moment().format('hh:mm:ss a'),
    Productos: orderObject.products,
    Metodo_de_pago: orderObject.payment,
    total: obtenerTotal(orderObject.products)/* ,
    Productos: obtenerDatosProductos(orderObject.products),
    Metodo_de_pago: payment.obtenerNombre(orderObject.payment),
    total: obtenerTotal(orderObject.products) */
  };

  orders.push({
    id: id,
    idUser: orderObject.idUser,
    state: 0,
    products: orderObject.products,
    date: dia,
    hour: hora,
    payment: orderObject.payment, // mostrar medios pago en swagger list metodos de pago
    total: obtenerTotal(orderObject.products)
  });

  return pedidoCargado;
};

function filterOrders(id){
  const datosFiltrados = orders.find(order => order.id == Number(id));
  return datosFiltrados;
};


function filterOrdersxId(id){
  let pedidoCargado = [];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser == id){
      
      pedidoCargado.push({
        idPedido: orders[i].id,
        idUsuario: orders[i].idUser,
        Usuario: users.obtenerNickname(orders[i].idUser),
        Nombre: users.obtenerNombre(orders[i].idUser),
        Estado: states.obtenerNombre(orders[i].state),
        
        Productos: "obtenerDatosProductos(orders[i])",
      
        Metodo_de_pago: payment.obtenerNombre(orders[i].payment),
        total: orders[i].total
      });
    }
  };
  
  return pedidoCargado;
};

function listOrders(){
  let pedidoCargado = [];

  for (i = 0; i < orders.length; i++) {
    pedidoCargado.push({
      idPedido: orders[i].id,
      idUsuario: orders[i].idUser,
      Usuario: users.obtenerNickname(orders[i].idUser),
      Nombre: users.obtenerNombre(orders[i].idUser),
      Estado: states.obtenerNombre(orders[i].state),
      
      Productos: "obtenerDatosProductos(orders[i])",
    
      Metodo_de_pago: payment.obtenerNombre(orders[i].payment),
      total: orders[i].total
    });
  };
  return pedidoCargado;
};

const searchIndex = (idOrder) => {
  return orders.findIndex(x => x.id == idOrder);
};

function cambiarEstadosPedidos(idOrder, orderState){
  orderState = {
    state: parseInt(orderState)
  };

  orders[searchIndex(idOrder)] = orderState;

  return `Estado de pedido Actualizado`;
};

function pedidoConfirmado(idUser, idOrder){
  return "Pedido Confirmado";
};

function modificarOrder(idOrder, orderObject){
  orderObject = {
    id: parseInt(idOrder),
    idUser: parseInt(orderObject.idUser),
    state: parseInt(orderObject.state), 
    products: orderObject.products,
    payment: parseInt(orderObject.payment),
    total: orderObject.total
  };

  orders[searchIndex(idOrder)] = orderObject;

  return 'Order updated';
};

function borrarOrder(idOrder){
  const objetoBuscado = orders[searchIndex(idOrder)];

  const orderPosition = orders.indexOf(objetoBuscado);

  orders.splice(orderPosition, 1);
  
  return 'Order deleted'; 
};

exports.verEstados = verEstados;
exports.cambiarEstadosPedidos = cambiarEstadosPedidos;
exports.modificarEstadoDePedido = modificarEstadoDePedido;
exports.pedidoConfirmado = pedidoConfirmado;
exports.confirmarPedido = confirmarPedido;
exports.traerPedido = traerPedido;
exports.filterOrders = filterOrders;
exports.filterOrdersxId = filterOrdersxId;

exports.listOrders = listOrders;
exports.crearOrder = crearOrder;
exports.modificarOrder = modificarOrder;
exports.borrarOrder = borrarOrder;