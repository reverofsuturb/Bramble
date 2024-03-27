"use strict";
const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          body: "everything is wonderful",
          rating: 5,
          user_id: 1,
          product_id: 1,
        },
        {
          body: "everything is great",
          rating: 4,
          user_id: 1,
          shop_id: 1,
        },
        {
          body: "everything is very mediocre",
          rating: 3,
          user_id: 1,
          product_id: 2,
        },
        {
          body: "everything is interesting",
          rating: 2,
          user_id: 1,
          shop_id: 2,
        },
        {
          body: "wow!",
          rating: 5,
          user_id: 1,
          product_id: 3,
        },
        {
          body: "holy smokes!",
          rating: 1,
          user_id: 1,
          shop_id: 3,
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        body: { [Op.in]: ["%a%"] },
      },
      {}
    );
  },
};
