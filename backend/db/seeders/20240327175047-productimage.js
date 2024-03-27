"use strict";
const { ProductImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ProductImage.bulkCreate(
      [
        {
          image: "url.url",
          product_id: 1,
        },
        {
          image: "url.url",
          product_id: 2,
        },
        {
          image: "url.url",
          product_id: 3,
        },
        {
          image: "url.url",
          product_id: 4,
        },
        {
          image: "url.url",
          product_id: 5,
        },
        {
          image: "url.url",
          product_id: 6,
        },
        {
          image: "url.url",
          product_id: 7,
        },
      ],
      { validate: true }
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ProductImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      image: { [Op.in]: ["%a%"] },
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
