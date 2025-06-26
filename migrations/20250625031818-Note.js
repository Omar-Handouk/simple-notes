'use strict';
const { v4:uuid } = require('uuid');

/**
 * @type {import('sequelize-cli').Migration}
 * */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('notes', {
      noteId: {
        type: Sequelize.DataTypes.UUIDV4,
        defaultValue: uuid,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false
      },
      body: Sequelize.DataTypes.TEXT,
      columnId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('notes');
  }
};
