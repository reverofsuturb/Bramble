"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryImage.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  CategoryImage.init(
    {
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CategoryImage",
    }
  );
  return CategoryImage;
};
