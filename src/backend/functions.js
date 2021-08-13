const users = require('./models/usuarios');
const orders = require('./models/pedidos');
const products = require('./models/productos');

/* ------------------ CONSTRUCTORES ------------------ */

function User(id, user, completeName, email, phone, mainAddress, altAddress, password) {
  this.id = Number(id);
  this.user = String(user);
  this.completeName = String(completeName);
  this.email = String(email);
  this.phone = Number(phone);
  this.mainAddress = String(mainAddress);
  this.altAddress = String(altAddress);
  this.pass = String(password);
};

function Order(id, state, products, formaPago, price){
  this.id = Number(id);
  this.state = String(state),
  this.products = products,
  this.formaPago = String(formaPago)
  this.price = Number(price);
};

function Product(id, name, price, pic){
  this.id = Number(id);
  this.name = String(name),
  this.price = Number(price);
  this.pic = String(pic);
};

/* ----------------------------------------------------- */
/* ------------------ FUNCIONES DATOS ------------------ */
/* ----------------------------------------------------- */

function filterUsers(id){
  const datosFiltrados = users.filter(usuario => usuario.id == Number(id));
  return datosFiltrados;
}

/* ---------------- FUNCIONES USUARIOS ----------------- */
function listUsers(){
  return(users);
};

function crearUser(){
  users.push(new User(
  1,
  "javiboin",
  "Javier Alejandro Oyarzo", 
  "javi_14_228@hotmail.com",
  542964444000,
  "Rivadavia 123",
  null,
  "123"
  ));

  /* console.log(users); */
  return(users);
};

function modificarUser(id, user, completeName, email, phone, mainAddress, altAddress, password){
  /* let usuarioEncontrado = users.filter(usuario => usuario.id == id); */

  users[0].id = Number(id);
  users[0].user = String(user);
  users[0].completeName = String(completeName);
  users[0].email = String(email);
  users[0].phone = Number(phone);
  users[0].mainAddress = String(mainAddress);
  users[0].altAddress = String(altAddress);
  users[0].pass = String(password);

  return(users);
};

function borrarUser(id){
  return(users); /* provisional */
};

/* ------------------ FUNCIONES PEDIDOS ------------------ */
function listOrders(){
  return(orders);
};

function crearOrder(){
  orders.push(new Order(
  1,
  "En Proceso",
  [1,2,3],
  "Efectivo",
  500
  ));

  return(orders);
};

function modificarOrder(id, state, products, formaPago, price){
  orders[0].id = Number(id);
  orders[0].state = String(state);
  orders[0].products = products;
  orders[0].formaPago = String(formaPago);
  orders[0].price = Number(price);

  return(orders);
};

function borrarOrder(id){
  return(orders);
};

/* ------------------ FUNCIONES PRODUCTOS ------------------ */
function listProducts(){
  return(products);
};

function crearProduct(){
  products.push(new Product(
    1,
    "Hamburguesa Clasica",
    500, 
    "IMAGEN"
  ));

  /* console.log(users); */
  return(products);
};

function modificarProduct(id, name, price, pic){
  products[0].id = Number(id);
  products[0].name = String(name),
  products[0].price = Number(price);
  products[0].pic = String(pic);

  return(products);
};

function borrarProduct(id){
  return(products);
};

/* ------------------ EXPORTS ------------------ */
exports.filterUsers = filterUsers;

exports.listUsers = listUsers;
exports.crearUser = crearUser;
exports.modificarUser = modificarUser;
exports.borrarUser = borrarUser;

exports.listOrders = listOrders;
exports.crearOrder = crearOrder;
exports.modificarOrder = modificarOrder;
exports.borrarOrder = borrarOrder;

exports.listProducts = listProducts;
exports.crearProduct = crearProduct;
exports.modificarProduct = modificarProduct;
exports.borrarProduct = borrarProduct;