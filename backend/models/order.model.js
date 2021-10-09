const OrderModel = (connection, Sequelize) => {
  const Order = connection.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATEONLY
    },
    hour: {
      type: Sequelize.DATE,
      primaryKey: true
    },
    total: {
      type: Sequelize.FLOAT(6, 2)
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    id_address: {
      type: Sequelize.INTEGER
    },
    id_order_state: {
      type: Sequelize.INTEGER
    },
    id_payment_method: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Order
};

module.exports = OrderModel;