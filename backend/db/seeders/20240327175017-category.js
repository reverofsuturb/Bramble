"use strict";
const { Category } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Category.bulkCreate(
      [
        {
          name: "Clothing",
          user_id: 1,
        },
        {
          name: "Food",
          user_id: 1,
        },
        {
          name: "Animals",
          user_id: 1,
        },
        {
          name: "Drinks",
          user_id: 1,
        },
        {
          name: "Furniture",
          user_id: 1,
        },
        {
          name: "Electronics",
          user_id: 2,
        },
        {
          name: "Weapons",
          user_id: 2,
        },
        {
          name: "Armor",
          user_id: 2,
        },
        {
          name: "Movies",
          user_id: 2,
        },
        {
          name: "Shows",
          user_id: 2,
        },
        {
          name: "Decorations",
          user_id: 3,
        },
        {
          name: "Art",
          user_id: 3,
        },
        {
          name: "Automobile",
          user_id: 3,
        },
        {
          name: "Property",
          user_id: 3,
        },
        {
          name: "Recreation",
          user_id: 3,
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
    options.tableName = "Categories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["%a%"] },
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
