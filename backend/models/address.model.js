const AddressModel = (connection, Sequelize) => {
  const Address = connection.define('addresses', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: Sequelize.STRING
    },
    id_address: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Address
};

module.exports = AddressModel;