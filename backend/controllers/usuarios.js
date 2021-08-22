const users = require('../models/usuarios');

const searchIndex = (id) => {
  return users.findIndex(x => x.id == id);
};

function obtenerNickname(id){
  let nickname = users[searchIndex(id)].nickname;
  return nickname;
};

function obtenerNombre(id){
  let name = users[searchIndex(id)].completeName;
  return name;
};

function obtenerDireccion(id){
  let address = products[searchIndex(id)].address;
  return address;
};

function emailrepetido(email){
  return users.find(user => user.email === email) ? true : false;
};

function filterUsers(id){
  const datosFiltrados = users.filter(usuario => usuario.id == Number(id));
  return datosFiltrados;
};

function login(userObject) {
  const username = userObject.nickname;
  const password = userObject.password;
  
  const logins = users.find(user => user.nickname === username && user.password === password);
  if (logins !== undefined){
    return `Bienvenido a nuestra ${username}`;
  } else {
    return 'El usuario y/o Contraseña es incorrecta, Vuelva a intentarlo';
  };
};

function listUsers(){
  return(users);
};

function crearUser(userObject) {
  const id = users[users.length -1].id +1;
  users.push({
    id: id,
    nickname: userObject.nickname,
    completeName: userObject.completeName,
    email: userObject.email,
    phone: userObject.phone,
    address: userObject.address,
    password: userObject.password
  });
  return 'User created';
};

function modificarUser(id, userObject){
  userObject = {
    id: parseInt(id),
    nickname: userObject.nickname,
    completeName: userObject.completeName,
    email: userObject.email,
    phone: userObject.phone,
    address: userObject.address,
    password: userObject.password
  };

  users[searchIndex(idUser)] = userObject;

  return 'User updated';
};

function borrarUser(idUser){
  const objetoBuscado = users[searchIndex(idUser)];

  const userPosition = users.indexOf(objetoBuscado);

  users.splice(userPosition, 1);

  return 'User deleted'; 
};

exports.obtenerNickname = obtenerNickname;
exports.obtenerNombre = obtenerNombre;
exports.obtenerDireccion = obtenerDireccion;

exports.emailrepetido = emailrepetido;

exports.filterUsers = filterUsers;
exports.login = login;
exports.listUsers = listUsers;

exports.crearUser = crearUser;
exports.modificarUser = modificarUser;
exports.borrarUser = borrarUser;