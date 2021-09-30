const PagoModel = (connection, Sequelize) => {
  const Pago = connection.define('payment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Pago
};

module.exports = PagoModel;