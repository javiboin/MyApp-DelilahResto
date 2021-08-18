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

exports.listPayment = listPayment;
exports.crearMedioPago = crearMedioPago;