const administradores = require('../models/administrators.model');

function isAdmin(id) {
  return administradores.find(administrador => administrador == id) ? true : false;
};

exports.isAdmin = isAdmin;