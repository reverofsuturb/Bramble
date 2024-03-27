"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShopImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShopImage.belongsTo(models.Shop, { foreignKey: "shop_id" });
    }
  }
  ShopImage.init(
    {
      image: DataTypes.STRING,
      shop_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShopImage",
    }
  );
  return ShopImage;
};
