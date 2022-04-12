'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      sid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ua: {
        allowNull: false,
        type: Sequelize.STRING(512)
      },
      is_active: {
        allowNull: false,
        type: Sequelize.ENUM('no', 'yes'),
        defaultValue: 'no'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('sessions', ['user_id']);
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('sessions');
  }
};
