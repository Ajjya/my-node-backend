'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(512)
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_active: {
      allowNull: false,
      type: DataTypes.ENUM('no', 'yes'),
      defaultValue: 'no'
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING(8),
      defaultValue: '#fff'
    },
    reminders_count: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    notifications_count: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  }, {});
  return Users;
};
