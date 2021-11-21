const ProductModel = (connection, Sequelize) => {
  const Product = connection.define('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT(6, 2),
      allowNull: false
    },
    pic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_product_state: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'product_states',
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  });
  return Product
};

module.exports = ProductModel;