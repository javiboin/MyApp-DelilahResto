require("dotenv").config();
const jwt = require('jsonwebtoken');

const access = (req, res, next) => {
    /* tareas
    
    hacer un middleware que verifique el estado del usuarioEncontrado
    middleware para detectar que no este suspendido*/

  try {
    const bearer = req.headers['authorization'].split(" ");
    const token = bearer[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    next();
  } catch {
    res.status(403).send('Acceso no autorizado');
  }
};

const isAdmin = (req, res, next) => {
  const bearer = req.headers['authorization'].split(" ");
  const token = bearer[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.id_user_state === 1) { 
    next();
  } else {
    res.status(403).send('Acceso no autorizado');
  }
}

module.exports = { access , isAdmin};