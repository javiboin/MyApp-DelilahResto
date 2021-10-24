const metodosPago =  require('../models/payment.model');

function filterPayment(id){
  const datosFiltrados = metodosPago.find(metodo => metodo.id == Number(id));
  return datosFiltrados;
};

const searchIndex = (id) => {
  return metodosPago.findIndex(x => x.id == id);
};

function obtenerNombre(id){
  let nombre = metodosPago[searchIndex(id)].name;
  return nombre;
};

function listPayment() {  
  let pedidoCargado = [];

  for (i = 0; i < metodosPago.length; i++) {
    pedidoCargado.push({
      ID: parseInt(metodosPago[i].id),
      Nombre: metodosPago[i].name
    });
  };
  return pedidoCargado;
}

function crearMedioPago(paymentObject) {
  const id = parseInt(metodosPago[metodosPago.length -1].id +1);
  metodosPago.push({
    id: id,
    name: paymentObject.name
  });

  let pedidoCargado = {
    Mensaje: 'Medio de Pago añadido',
    ID: id,
    Nombre: paymentObject.name
  };

  return pedidoCargado;
};

function modificarPayment(id, paymentObject) {
  paymentObject = {
    id: parseInt(id),
    name: paymentObject.name
  };

  metodosPago[searchIndex(id)] = paymentObject;

  return "Metodo de pago actualizado";
};

function borrarPayment(id){
  const objetoBuscado = metodosPago[searchIndex(id)];

  const position = metodosPago.indexOf(objetoBuscado);

  metodosPago.splice(position, 1);

  return 'Payment deleted'; 
};

exports.filterPayment = filterPayment;
exports.obtenerNombre = obtenerNombre;
exports.listPayment = listPayment;
exports.crearMedioPago = crearMedioPago;
exports.modificarPayment = modificarPayment;
exports.borrarPayment = borrarPayment;