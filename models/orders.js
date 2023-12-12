"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Order.init(
    {
      number: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
