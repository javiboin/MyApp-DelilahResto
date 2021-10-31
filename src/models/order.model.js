const OrderModel = (connection, Sequelize) => {
  const Order = connection.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    total: {
      type: Sequelize.FLOAT(6, 2)
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    id_address: {
      type: Sequelize.INTEGER,
      references: 'addresses', 
      referencesKey: 'id'
    },
    id_order_state: {
      type: Sequelize.INTEGER,
      references: 'order_states', 
      referencesKey: 'id'
    },
    id_payment_method: {
      type: Sequelize.INTEGER,
      references: 'payment_methods', 
      referencesKey: 'id'
    }
  },
  {
    timestamps: false
  });
  return Order
};

module.exports = OrderModel;