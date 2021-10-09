const ProductStateModel = (connection, Sequelize) => {
  const ProductState = connection.define('product_states', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  });
  return ProductState
};

module.exports = ProductStateModel;