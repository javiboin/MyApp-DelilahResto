const orders = require('../models/pedidos');
const users = require('../controllers/usuarios');
const states = require('../controllers/estados.js');
const payment = require('../controllers/metodosPago');
const products = require('../controllers/productos');

function verEstados(idUser){
  return orders.filter(pedido => pedido.idUser === Number(idUser));
};

function filterOrders(id){
  const datosFiltrados = orders.filter(order => order.id == Number(id));
  return datosFiltrados;
};

function cambiarEstadosPedidos(idOrder, orderObject){
  orderObject = {
    state: parseInt(orderObject.state)
  };

  orders[searchIndexOrder(idOrder)] = orderObject;

  return 'Order updated';
};

function orderID(id) {
  return orders.filter(order => order.id == id);
};

function listOrders(){
  return(orders);
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
  const id = orders[orders.length -1].id +1;

  let pedidoCargado = {
    Mensaje: 'Order created',
    ID: id,
    Usuario: users.obtenerNickname(orderObject.idUser),
    Nombre: users.obtenerNombre(orderObject.idUser),
    Estado: states.obtenerNombre(1),
    Productos: obtenerDatosProductos(orderObject.products),
    Metodo_de_pago: payment.obtenerNombre(orderObject.payment),
    total: obtenerTotal(orderObject.products)
  };

  orders.push({
    id: id,
    idUser: orderObject.idUser,
    state: 1,
    products: orderObject.products,
    payment: orderObject.payment, // mostrar medios pago en swagger list metodos de pago
    total: pedidoCargado.total
  });

  return pedidoCargado;
};

const searchIndexOrder = (idOrder) => {
  return orders.findIndex(x => x.id == idOrder);
};

function modificarOrder(idOrder, orderObject){
  orderObject = {
    id: parseInt(idOrder),
    idUser: parseInt(orderObject.idUser),
    state: parseInt(orderObject.state), 
    products: orderObject.products,
    formaPago: parseInt(orderObject.formaPago)

  };

  orders[searchIndexOrder(idOrder)] = orderObject;

  return 'Order updated';
};

function borrarOrder(idOrder){
  const objetoBuscado = orders[searchIndexOrder(idOrder)];

  const orderPosition = orders.indexOf(objetoBuscado);

  orders.splice(orderPosition, 1);
  
  return 'Order deleted'; 
};

exports.verEstados = verEstados;
exports.cambiarEstadosPedidos = cambiarEstadosPedidos;

exports.filterOrders = filterOrders;
exports.orderID = orderID;

exports.listOrders = listOrders;
exports.crearOrder = crearOrder;
exports.modificarOrder = modificarOrder;
exports.borrarOrder = borrarOrder;