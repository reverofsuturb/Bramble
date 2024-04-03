"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Products",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.FLOAT,
        },
        description: {
          type: Sequelize.TEXT,
        },
        details: {
          type: Sequelize.STRING,
        },
        shipping: {
          type: Sequelize.STRING,
        },
        featured: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
        shop_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: "Shops",
            key: "id",
          },
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Categories",
            key: "id",
          },
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Products";
    await queryInterface.dropTable(options);
  },
};
