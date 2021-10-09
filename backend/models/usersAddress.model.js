const { Sequelize } = require("sequelize/types")

const UserAddressModel = (connection, sequelize) => {
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
    timestamp: false
  });
  return UserAddress
};

module.exports = UserAddressModel;