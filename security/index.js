/* require('dotenv').config();

const jwt = require('jsonwebtoken');
const userInfo = {nombre:'javier', edad: 31};
const signature = 'clavesecreta';

const token = jwt.sign(userInfo, signature);

console.log(token);

const decoded = jwt.verify(token, signature);
console.log(decoded); */