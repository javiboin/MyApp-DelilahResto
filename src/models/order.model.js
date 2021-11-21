const Sequelize = require('sequelize');
const connection = require("../config/db.config");
const Address = require('../models/address.model')(connection, Sequelize);

const OrderModel = (connection, Sequelize) => {
  const Order = connection.define('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    total: {
      type: Sequelize.FLOAT(6, 2)
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
    },
    id_order_state: {
      type: Sequelize.INTEGER,
      references: 'order_states', 
      referencesKey: 'id'
    },
    id_payment_method: {
      type: Sequelize.INTEGER,
      references: 'payment_methods', 
      referencesKey: 'id'
    }
  },
  {
    timestamps: false
  });

 // Order.hasOne(Address, {as: 'domicilios', foreignKey: "domicilios_id"})

  return Order
};

module.exports = OrderModel;