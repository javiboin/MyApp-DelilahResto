const PaymentMethodModel = (connection, Sequelize) => {
  const PaymentMethod = connection.define('payment_methods', {
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
  return PaymentMethod
};

module.exports = PaymentMethodModel;