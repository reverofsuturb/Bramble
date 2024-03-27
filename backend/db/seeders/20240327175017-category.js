"use strict";
const { Category } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Category.bulkCreate(
      [
        {
          name: "clothing",
        },
        {
          name: "food",
        },
        {
          name: "animals",
        },
        {
          name: "drinks",
        },
        {
          name: "furniture",
        },
        {
          name: "electronics",
        },
        {
          name: "weapons",
        },
        {
          name: "armor",
        },
        {
          name: "movies",
        },
        {
          name: "shows",
        },
        {
          name: "decorations",
        },
        {
          name: "art",
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
    options.tableName = 'Categories'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['%a%']}
    })
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
