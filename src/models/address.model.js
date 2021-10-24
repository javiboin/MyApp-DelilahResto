const AddressModel = (connection, Sequelize) => {
  const Address = connection.define('addresses', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Address
};

module.exports = AddressModel;