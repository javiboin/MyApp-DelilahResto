const UserSuspensionModel = (connection, Sequelize) => {
  const UserSuspension = connection.define('user_suspensions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    reason: {
      type: Sequelize.STRING
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: 'users', 
      referencesKey: 'id'
    }
  },
  {
    timestamps: false
  });
  return UserSuspension
};

module.exports = UserSuspensionModel;