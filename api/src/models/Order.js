const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,      
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    orderIdPayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      isEmail: true,
    },        
    paymentSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
    },
  });
};