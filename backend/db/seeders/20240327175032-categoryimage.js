"use strict";
const { CategoryImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await CategoryImage.bulkCreate(
      [
        {
          image: "url.url",
          category_id: 1,
        },
        {
          image: "url.url",
          category_id: 2,
        },
        {
          image: "url.url",
          category_id: 3,
        },
        {
          image: "url.url",
          category_id: 4,
        },
        {
          image: "url.url",
          category_id: 5,
        },
        {
          image: "url.url",
          category_id: 6,
        },
        {
          image: "url.url",
          category_id: 7,
        },
        {
          image: "url.url",
          category_id: 8,
        },
        {
          image: "url.url",
          category_id: 9,
        },
        {
          image: "url.url",
          category_id: 10,
        },
        {
          image: "url.url",
          category_id: 11,
        },
        {
          image: "url.url",
          category_id: 12,
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
