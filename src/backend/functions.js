/* const users = require('./models/usuarios'); */
const orders = require('./models/pedidos');
const products = require('./models/productos');

/* function filterUsers(id){
  const datosFiltrados = users.filter(usuario => usuario.id == Number(id));
  return datosFiltrados;
}; */

/* function userID(id) {
  return users.filter(user => user.id == id);
}; */

/* function login(userObject) {
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
}; */

/* function crearUser(userObject) {
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
}; */

/* ------------------ FUNCIONES PEDIDOS ------------------ */
function filterOrders(id){
  const datosFiltrados = orders.filter(order => order.id == Number(id));
  return datosFiltrados;
};

function orderID(id) {
  return orders.filter(order => order.id == id);
};

function listOrders(){
  return(orders);
};

function crearOrder(orderObject){
  const id = orders[orders.length -1].id +1;

  orders.push({
    id: id,
    state: orderObject.state,
    products: orderObject.products,
    formaPago: orderObject.formaPago,
    price: orderObject.price
  });
  return 'Order created';
};

const searchIndexOrder = (idOrder) => {
  return orders.findIndex(x => x.id == idOrder);
};

function modificarOrder(idOrder, orderObject){
  orderObject = {
    id: parseInt(idOrder),
    state: orderObject.state,
    products: orderObject.products,
    formaPago: orderObject.formaPago,
    price: orderObject.price
  };

  orders[searchIndexOrder(idOrder)] = orderObject;

  return 'Order updated';
};

function borrarOrder(idOrder){
  const objetoBuscado = orders[searchIndexOrder(idOrder)];

  const orderPosition = orders.indexOf(objetoBuscado);

  orders.splice(orderPosition, 1);
  
  return 'Order deleted'; 
};

/* ------------------ FUNCIONES PRODUCTOS ------------------ */
function filterProducts(id){
  const datosFiltrados = products.filter(product => product.id == Number(id));
  return datosFiltrados;
};

function productID(id) {
  return products.filter(product => product.id == id);
};

function listProducts(){
  return(products);
};

function crearProduct(productObject){
  const id = products[products.length -1].id +1;

  products.push({
    id: id,
    name: productObject.name,
    price: productObject.price,
    pic: productObject.pic,
  });
  return 'Order created';
};

const searchIndexProduct = (idProduct) => {
  return products.findIndex(x => x.id == idProduct);
};

function modificarProduct(idProduct, productObject){
  productObject = {
    id: parseInt(idProduct),
    name: productObject.name,
    price: productObject.price,
    pic: productObject.pic
  };

  products[searchIndexProduct(idProduct)] = productObject;

  return 'Product updated';
};

function borrarProduct(idProduct){
  const objetoBuscado = products[searchIndexProduct(idProduct)];

  const productPosition = products.indexOf(objetoBuscado);

  products.splice(productPosition, 1);
  
  return 'Product deleted'; 
};

/* ------------------ EXPORTS ------------------ */
/* exports.filterUsers = filterUsers; */
/* exports.userID = userID; */

/* exports.login = login;
exports.listUsers = listUsers; */
/* exports.crearUser = crearUser;
exports.modificarUser = modificarUser;
exports.borrarUser = borrarUser; */

exports.filterOrders = filterOrders;
exports.orderID = orderID;

exports.listOrders = listOrders;
exports.crearOrder = crearOrder;
exports.modificarOrder = modificarOrder;
exports.borrarOrder = borrarOrder;

exports.filterProducts = filterProducts;
exports.productID = productID;

exports.listProducts = listProducts;
exports.crearProduct = crearProduct;
exports.modificarProduct = modificarProduct;
exports.borrarProduct = borrarProduct;