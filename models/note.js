'use strict';
const { v4:uuid } = require('uuid');
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns {Model}
 */
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Note.init({
    noteId: {
      type: DataTypes.UUIDV4,
      defaultValue: uuid,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    body: DataTypes.TEXT,
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Note',
    timestamps: true
  });
  return Note;
};