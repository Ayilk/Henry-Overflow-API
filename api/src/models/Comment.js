const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
      timestamps: true
    });
  };