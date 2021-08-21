const administradores = require('../models/administradores');

function isAdmin(id) {
  return administradores.find(administrador => administrador === id) ? true : false;
};

exports.isAdmin = isAdmin;