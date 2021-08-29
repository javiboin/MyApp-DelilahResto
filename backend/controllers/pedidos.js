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

function obtenerTotal(productos){
  sumaTotal = 0;

  for (i = 0; i < productos.length; i++) {
    sumaTotal = sumaTotal + (products.obtenerPrecio(productos[i].id) * productos[i].cant);
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
    Usuario: orderObject.idUser,
    Estado: 0,
    dia: dia,
    hora: hora,
    Productos: orderObject.products,
    Metodo_de_pago: orderObject.payment,
    total: obtenerTotal(orderObject.products)
  };

  orders.push({
    id: id,
    idUser: orderObject.idUser,
    state: 0,
    date: dia,
    hour: hora,
    products: orderObject.products,
    payment: orderObject.payment, 
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
  return (orders);
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
  let dia = moment().format('DD-MM-YYYY');
  let hora = moment().format('hh:mm:ss a');
  orderObject = {
    id: parseInt(idOrder),
    idUser: parseInt(orderObject.idUser),
    state: parseInt(orderObject.state), 
    date: dia,
    hour: hora,
    products: orderObject.products,
    payment: parseInt(orderObject.payment),
    total: obtenerTotal(orderObject.products)
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