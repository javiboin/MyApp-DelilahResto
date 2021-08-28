const states = require('../models/estados');

const searchIndex = (id) => {
  return states.findIndex(x => x.id == id);
};

function obtenerNombre(id){
  let name = states[id].name;

  return name;
};

exports.obtenerNombre = obtenerNombre;