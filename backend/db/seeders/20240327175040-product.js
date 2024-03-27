"use strict";
const { Product } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Product.bulkCreate(
      [
        {
          name: "orange",
          price: 7.55,
          description: "this is a navel of citrus",
          details: "spherical, round, dope",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "magic sandwich",
          price: 7.33,
          description: "this sandwich may posess magic",
          details: "sandticular, filled with excellence",
          shipping: "Free Shipping",
          category_id: 2,
          user_id: 1,
        },
        {
          name: "four shoes",
          price: 33.33,
          description: "who needs two when you can have four",
          details: "fits, perfectly",
          shipping: "Free Shipping",
          category_id: 1,
          user_id: 1,
        },
        {
          name: "corned beef computer",
          price: 100.23,
          description: "this is a computer made from corned beef",
          details: "meaty, dense, efficient",
          shipping: "Free Shipping",
          category_id: 6,
          user_id: 1,
        },
        {
          name: "not an elephant, but actually a chair",
          price: 2.33,
          description: "while the title denies the probability of this being an elephant it may be a chair",
          details: "tusks but not tusks",
          shipping: "Free Shipping",
          category_id: 5,
          user_id: 1,
        },
        {
          name: "frankfurters but as weapons",
          price: 7.54,
          description: "dont doubt",
          details: "spherical, round, dope",
          shipping: "Free Shipping",
          category_id: 7,
          user_id: 1,
        },
        {
          name: "steel vest",
          price: 6.66,
          description: "might protect chest",
          details: "metal",
          shipping: "Free Shipping",
          category_id: 8,
          user_id: 1,
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
