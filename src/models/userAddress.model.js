const UserAddressModel = (connection, Sequelize) => {
  const UserAddress = connection.define('users_address', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: 'users', 
      referencesKey: 'id'
    },
    id_address: {
      type: Sequelize.INTEGER,
      references: 'addresses', 
      referencesKey: 'id'
    }
  },{
    timestamps: false
  });
  return UserAddress
};

module.exports = UserAddressModel;