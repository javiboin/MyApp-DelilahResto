const metodosPago =  require('../models/metodosPago');
const { borrarOrder } = require('./pedidos');

function listPayment() {
  return(metodosPago);
}

function crearMedioPago(paymentObject) {
  const id = metodosPago[metodosPago.length -1].id +1;
  metodosPago.push({
    id: id,
    nombre: paymentObject.name});
  return 'Medio de Pago añadido';
};

const searchIndexPayment = (id) => {
  return metodosPago.findIndex(x => x.id == id);
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

exports.listPayment = listPayment;
exports.crearMedioPago = crearMedioPago;
exports.modificarPayment = modificarPayment;
exports.borrarPayment = borrarPayment;