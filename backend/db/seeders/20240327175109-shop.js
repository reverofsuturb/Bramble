"use strict";
const { Shop } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Shop.bulkCreate([
      {
        name: "shop one",
        about: "everything that is in the universe",
        policies: "none",
        items: 1,
        featured: 1,
        category_id: 1,
        user_id: 1,
      },
      {
        name: "wiggling",
        about: "general movement",
        policies: "ship it all back",
        items: 2,
        featured: 2,
        category_id: 2,
        user_id: 1,
      },
      {
        name: "shop 3",
        about: "sells things not in the universe",
        policies: "we'd have them if they existed",
        items: 3,
        featured: 3,
        category_id: 3,
        user_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Shops";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["%a%"] },
    });
  },
};
