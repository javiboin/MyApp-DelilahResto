require("dotenv").config();
const jwt = require('jsonwebtoken');

const access = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log(decoded);
    // aca podria decodificar bcrypt

    next();
  } catch {
    res.status(403).send('Acceso no autorizado')
  }
};

module.exports = { access };