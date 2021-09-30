const EstadoModel = (connection, Sequelize) => {
  const Estado = connection.define('states', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  });
  return Estado
};

module.exports = EstadoModel;