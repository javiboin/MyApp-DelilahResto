let orders = [
  {
    id: 1,
    idUser: 1,
    state: "Preparando",
    products: [1,2,3],
    formaPago: "Efectivo",
    price: 1500
  },
  {
    id: 2,
    idUser: 1,
    state: "Terminado",
    products: [1,3],
    formaPago: "Efectivo",
    price: 1000
  },
  {
    id: 3,
    idUser: 2,
    state: "Preparando",
    products: [1,2,3,4],
    formaPago: "Efectivo",
    price: 1800
  },
  {
    id: 4,
    idUser: 3,
    state: "Preparando",
    products: [1,2,3],
    formaPago: "Debito",
    price: 1580
  }
];

module.exports = orders;