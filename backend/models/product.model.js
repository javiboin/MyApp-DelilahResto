const ProductModel = (connection, Sequelize) => {
  const Product = connection.define('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT(6, 2)
    },
    pic: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  });
  return Product
};

module.exports = ProductModel;