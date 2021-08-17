const administradores = require('../models/administradores');

function isAdmin(id) {
  return administradores.find(administrado => administrador.id === id) ? true : false;
}

exports.isAdmin = isAdmin;