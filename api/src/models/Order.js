const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,      
    },
    first_name: {
      type: DataTypes.STRING,      
      allowNull: true,      
    },
    last_name: {
      type: DataTypes.STRING,      
      allowNull: true,      
    },
    payer_Id: {
      type: DataTypes.STRING,      
      allowNull: true,      
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    cycles_completed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cycles_remaining: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tenure_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_cycles: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    failed_payments_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },    
    last_payment_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    next_billing_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_overridden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_update_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      isEmail: true,
    },        
    
  });
};