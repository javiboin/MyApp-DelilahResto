const products = require('../models/productos');

const searchIndex = (idProduct) => {
  return products.findIndex(x => x.id == idProduct);
};

function obtenerNombre(id){
  let name = products[searchIndex(id)].name;
  return name;
};

function obtenerPrecio(id){
  let price = products[searchIndex(id)].price;
  return price;
};

function filterProducts(id){
  const datosFiltrados = products.filter(product => product.id == Number(id));
  return datosFiltrados;
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

function modificarProduct(idProduct, productObject){
  productObject = {
    id: parseInt(idProduct),
    name: productObject.name,
    price: productObject.price,
    pic: productObject.pic
  };

  products[searchIndex(idProduct)] = productObject;

  return 'Product updated';
};

function borrarProduct(idProduct){
  const objetoBuscado = products[searchIndex(idProduct)];

  const productPosition = products.indexOf(objetoBuscado);

  products.splice(productPosition, 1);
  
  return 'Product deleted'; 
};

exports.obtenerNombre = obtenerNombre;
exports.obtenerPrecio = obtenerPrecio;
exports.filterProducts = filterProducts;
exports.listProducts = listProducts;

exports.crearProduct = crearProduct;
exports.modificarProduct = modificarProduct;
exports.borrarProduct = borrarProduct;