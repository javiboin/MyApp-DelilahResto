const orders = require('../models/pedidos');

function verEstados(id){
  return pedidos.filter(pedido => pedido.idUser === id);
};

function filterOrders(id){
  const datosFiltrados = orders.filter(order => order.id == Number(id));
  return datosFiltrados;
};

function orderID(id) {
  return orders.filter(order => order.id == id);
};

function listOrders(){
  return(orders);
};

function crearOrder(orderObject){
  const id = orders[orders.length -1].id +1;

  orders.push({
    id: id,
    state: orderObject.state,
    products: orderObject.products,
    formaPago: orderObject.formaPago,
    price: orderObject.price
  });
  return 'Order created';
};

const searchIndexOrder = (idOrder) => {
  return orders.findIndex(x => x.id == idOrder);
};

function modificarOrder(idOrder, orderObject){
  orderObject = {
    id: parseInt(idOrder),
    state: orderObject.state,
    products: orderObject.products,
    formaPago: orderObject.formaPago,
    price: orderObject.price
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

exports.filterOrders = filterOrders;
exports.orderID = orderID;

exports.listOrders = listOrders;
exports.crearOrder = crearOrder;
exports.modificarOrder = modificarOrder;
exports.borrarOrder = borrarOrder;