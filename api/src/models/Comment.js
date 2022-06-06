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
            unique: true,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    },
    {
      timestamps: true
    });
  };