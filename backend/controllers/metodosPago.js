const metodosPago =  require('../models/metodosPago');

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

const searchIndexPayment = (idPayment) => {
  return metodosPago.findIndex(x => x.id == idPayment);
};

function modificarPayment(idPayment, paymentObject) {
  paymentObject = {
    id: paymentObject.idPayment,
    name: paymentObject.name
  };

  metodosPago[searchIndexPayment(idPayment)] = paymentObject;

  return "Metodo de pago actualizado";
};

exports.listPayment = listPayment;
exports.crearMedioPago = crearMedioPago;
exports.modificarPayment = modificarPayment;