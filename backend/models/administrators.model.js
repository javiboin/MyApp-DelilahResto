const AdministratorModel = (connection, Sequelize) => {
  const Administrator = connection.define('administrators', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Administrator
};

module.exports = AdministratorModel;