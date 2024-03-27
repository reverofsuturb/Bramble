"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Product, { foreignKey: "product_id" });
      Review.belongsTo(models.Shop, { foreignKey: "shop_id" });
      Review.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Review.init(
    {
      type: DataTypes.STRING,
      body: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      shop_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
