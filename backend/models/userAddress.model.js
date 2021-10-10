const UserAddressModel = (connection, Sequelize) => {
  const UserAddress = connection.define('users_address', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    id_address: {
      type: Sequelize.INTEGER
    }
  },{
    timestamps: false
  });
  return UserAddress
};

module.exports = UserAddressModel;