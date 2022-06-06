const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('report', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        reason: {
            type: DataTypes.ENUM("spam", "inadecuado"),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
        }
    },
    {
      timestamps: false
    });
  };