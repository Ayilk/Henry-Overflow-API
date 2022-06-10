const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('inbox', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      userId: {
        type: DataTypes.UUID,
        unique: 'notification'
      },
      commentId: {
        type: DataTypes.UUID,
        unique: 'notification',
      },
      likeId: {
        type: DataTypes.UUID,
        unique: 'notification',
      }
    },
    {
      timestamps: false
    }
  );
};