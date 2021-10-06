const UserModel = (connection, Sequelize) => {
  const User = connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nickname: {
      type: Sequelize.STRING
    },
    complete_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  });
  return User
};

module.exports = UserModel;