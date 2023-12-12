"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
      Product.belongsToMany(models.Order, {
        through: models.ProductOrder,
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
