const metodosPago =  require('../models/metodosPago');
const { borrarOrder } = require('./pedidos');

const searchIndexPayment = (id) => {
  return metodosPago.findIndex(x => x.id == id);
};

function obtenerNombre(id){
  let nombre = metodosPago[searchIndexPayment(id)].name;
  return nombre;
};

function listPayment() {  // valido para todo
  return(metodosPago);
}

function crearMedioPago(paymentObject) {
  const id = metodosPago[metodosPago.length -1].id +1;
  metodosPago.push({
    id: id,
    nombre: paymentObject.name});
  return 'Medio de Pago añadido';
};

function modificarPayment(id, paymentObject) {
  paymentObject = {
    id: id,
    name: paymentObject.name
  };

  metodosPago[searchIndexPayment(id)] = paymentObject;

  return "Metodo de pago actualizado";
};

function borrarPayment(id){
  const objetoBuscado = metodosPago[searchIndexPayment(id)];

  const position = metodosPago.indexOf(objetoBuscado);

  metodosPago.splice(position, 1);

  return 'Payment deleted'; 
};

exports.obtenerNombre = obtenerNombre;
exports.listPayment = listPayment;
exports.crearMedioPago = crearMedioPago;
exports.modificarPayment = modificarPayment;
exports.borrarPayment = borrarPayment;