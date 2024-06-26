"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.belongsTo(models.Category, { foreignKey: "category_id" });
      Shop.belongsTo(models.User, { foreignKey: "user_id" });
      Shop.hasMany(models.Product, { foreignKey: "shop_id" });
      Shop.hasMany(models.ShopImage, { foreignKey: "shop_id" });
      Shop.hasMany(models.Review, { foreignKey: "shop_id" });
    }
  }
  Shop.init(
    {
      name: DataTypes.STRING,
      about: DataTypes.STRING,
      policies: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
