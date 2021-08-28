/* FALTA CANTIDADES Y FECHA DE PEDIDO */
let orders = [
  {
    id: 1,
    idUser: 4,
    state: 1,
    date: "date",
    hour: "hora",
    products: [
      {id: 1, price: 400, cant: 1},
      {id: 2, price: 500, cant: 1},
      {id: 3, price: 600, cant: 1}
    ],
    payment: 1,
    total: 2500
  },
  {
    id: 2,
    idUser: 3,
    state: 1,
    date: "date",
    hour: "hora",
    products: [
      {id: 1, price: 400, cant: 1},
      {id: 2, price: 500, cant: 1},
      {id: 3, price: 600, cant: 1}
    ],
    payment: 1,
    total: 2500
  },
  {
    id: 3,
    idUser: 4,
    state: 1,
    date: "date",
    hour: "hora",
    products: [
      {id: 1, price: 400, cant: 1},
      {id: 2, price: 500, cant: 1},
      {id: 3, price: 600, cant: 1}
    ],
    payment: 1,
    total: 2500
  },
  {
    id: 4,
    idUser: 4,
    state: 0,
    date: "date",
    hour: "hora",
    products: [
      {id: 1, price: 400, cant: 1},
      {id: 2, price: 500, cant: 1},
      {id: 3, price: 600, cant: 1}
    ],
    payment: 1,
    total: 2500
  }
];

module.exports = orders;