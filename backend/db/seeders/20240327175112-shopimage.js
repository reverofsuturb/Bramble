"use strict";
const { ShopImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ShopImage.bulkCreate(
      [
        {
          image: "url.url",
          shop_id: 1,
        },
        {
          image: "url.url",
          shop_id: 2,
        },
        {
          image: "url.url",
          shop_id: 3,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "CategoryImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      image: { [Op.in]: ["%a%"] },
    });
  },
};
