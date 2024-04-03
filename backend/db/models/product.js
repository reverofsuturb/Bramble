"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product.hasMany(models.Category, { foreignKey: "category_id" });
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.belongsTo(models.User, { foreignKey: "user_id" });
      Product.belongsTo(models.Shop, { foreignKey: "shop_id" });
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.Review, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      details: DataTypes.STRING,
      shipping: DataTypes.STRING,
      featured: DataTypes.BOOLEAN,
      shop_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
