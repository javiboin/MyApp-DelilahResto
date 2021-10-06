const states = require('../models/state.model');

const searchIndex = (id) => {
  return states.findIndex(x => x.id == id);
};

function obtenerNombre(id){
  let name = states[id].name;

  return name;
};

exports.obtenerNombre = obtenerNombre;