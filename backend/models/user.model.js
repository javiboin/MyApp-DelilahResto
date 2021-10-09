const UserModel = (connection, Sequelize) => {
  const User = connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nickname: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    id_user_state: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return User
};

module.exports = UserModel;