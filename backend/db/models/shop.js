'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init({
    name: DataTypes.STRING,
    about: DataTypes.STRING,
    policies: DataTypes.STRING,
    items: DataTypes.INTEGER,
    featured: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    review_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};