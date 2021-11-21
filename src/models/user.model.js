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


  return User
};

module.exports = UserModel;