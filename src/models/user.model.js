// llamar al model users states
const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const { UserState } = require('../models/userStates.model')(connection, Sequelize);

const UserModel = (connection, Sequelize) => {
  const User = connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_user_state: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UserState',
        key: 'id'
    }
    }
  },
  {
    timestamps: false
  });

  // relacion 1:1 Father.hasMany(Child); // Set one to many relationship
  // los 2 define

  /*  MainClient.hasOne(MainDashboard, { foreignKey: 'clientId' })
      MainDashboard.belongsTo(MainClient, { foreignKey: 'clientId' })

      class User extends Model {}
      User.init({
        name: Sequelize.STRING,
        email: Sequelize.STRING
      }, {
      sequelize,
      modelName: 'user'
      });

class Project extends Model {}
Project.init({
  name: Sequelize.STRING
}, {
  sequelize,
  modelName: 'project'
});

User.hasOne(Project);
 */
  return User
};

// users.belongsTo(user_state)

module.exports = UserModel;