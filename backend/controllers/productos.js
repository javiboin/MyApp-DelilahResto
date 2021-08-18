const products = require('../models/productos');
const administradores = require('../controllers/administradores');

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

exports.filterProducts = filterProducts;
exports.productID = productID;

exports.listProducts = listProducts;
exports.crearProduct = crearProduct;
exports.modificarProduct = modificarProduct;
exports.borrarProduct = borrarProduct;