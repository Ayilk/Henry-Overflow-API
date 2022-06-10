const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorite', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      commentOrPost: {
        type: DataTypes.ENUM("comment", "post"),
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        unique: 'like'
      },
      postId: {
        type: DataTypes.UUID,
        unique: 'like',
      },
      commentId: {
        type: DataTypes.UUID,
        unique: 'like',
      }
    },
    {
      timestamps: false
    }
  );
};