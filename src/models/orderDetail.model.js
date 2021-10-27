const OrderDetailModel = (connection, Sequelize) => {
  const OrderDetail = connection.define('orders_detail', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_order: {
      type: Sequelize.INTEGER,
      references: 'orders', 
      referencesKey: 'id'
    },
    id_product: {
      type: Sequelize.INTEGER,
      references: 'products', 
      referencesKey: 'id'
    },
    amount: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT(6,2)
    }
  },
  {
    timestamps: false
  });
  return OrderDetail
};

module.exports = OrderDetailModel;