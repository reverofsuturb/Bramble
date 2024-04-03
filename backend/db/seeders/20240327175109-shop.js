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
        name: "Galactic Emporium",
        about: "Everything That Is In The Universe",
        policies: "none",
        category_id: 1,
        user_id: 1,
      },
      {
        name: "Wiggling Central",
        about: "General Movement Enthusiasts",
        policies: "ship it all back",
        category_id: 2,
        user_id: 1,
      },
      {
        name: "AntiShop",
        about: "Everything That Is Not In The Universe",
        policies: "we'd have them if they existed",
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
