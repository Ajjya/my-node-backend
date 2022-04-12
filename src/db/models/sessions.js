'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('sessions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT.UNSIGNED
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    sid: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ua: {
      allowNull: false,
      type: DataTypes.STRING(512)
    },
    is_active: {
      allowNull: false,
      type: DataTypes.ENUM('no', 'yes'),
      defaultValue: 'no'
    },
  }, {});
  // Sessions.associate = function(models) {
  // // associations can be defined here
  // };
  return Sessions;
};
