const states = require('../models/estados');

const searchIndex = (id) => {
  return states.findIndex(x => x.id == id);
};

function obtenerNombre(id){
  let name = states[searchIndex(id)].name;
  return name;
};

exports.obtenerNombre = obtenerNombre;