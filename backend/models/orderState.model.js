const OrderStateModel = (connection, Sequelize) => {
  const OrderState = connection.define('order_states', {
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
  return OrderState
};

module.exports = OrderStateModel;