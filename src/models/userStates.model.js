const UserStateModel = (connection, Sequelize) => {
  const UserState = connection.define('user_states', {
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
  return UserState
};

module.exports = UserStateModel;