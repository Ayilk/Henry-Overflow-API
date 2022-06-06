const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('plan', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,            
        },
        monthly_price: {
            type: DataTypes.FLOAT,            
        },
        yearly_price: {
            type: DataTypes.FLOAT,            
        }
    },
    {
      timestamps: false
    });
  };