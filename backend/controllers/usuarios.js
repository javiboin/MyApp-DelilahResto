const users = require('../models/usuarios');

function emailrepetido(email) {
  return users.find(user => user.email === email) ? true : false;
}

function filterUsers(id){
  const datosFiltrados = users.filter(usuario => usuario.id == Number(id));
  return datosFiltrados;
};

function userID(id) {
  return users.filter(user => user.id == id);
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
    mainAddress: userObject.mainAddress,
    altAddress: userObject.altAddress,
    password: userObject.password
  });
  return 'User created';
};

const searchIndexUser = (idUser) => {
  return users.findIndex(x => x.id == idUser);
};

function modificarUser(idUser, userObject){
  userObject = {
    id: parseInt(idUser),
    nickname: userObject.nickname,
    completeName: userObject.completeName,
    email: userObject.email,
    phone: userObject.phone,
    mainAddress: userObject.mainAddress,
    altAddress: userObject.altAddress,
    password: userObject.password
  };

  users[searchIndexUser(idUser)] = userObject;

  return 'User updated';
};

function borrarUser(idUser){
  const objetoBuscado = users[searchIndexUser(idUser)];

  const userPosition = users.indexOf(objetoBuscado);

  users.splice(userPosition, 1);

  return 'User deleted'; 
};

exports.emailrepetido = emailrepetido;

exports.filterUsers = filterUsers;
exports.userID = userID;

exports.login = login;
exports.listUsers = listUsers;
exports.crearUser = crearUser;
exports.modificarUser = modificarUser;
exports.borrarUser = borrarUser;