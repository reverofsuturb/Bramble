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
          image: "https://bramble-bucket.s3.amazonaws.com/1712959854586.png",
          category_id: 1,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712961404157.png",
          category_id: 2,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712961707571.png",
          category_id: 3,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712961845025.png",
          category_id: 4,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712962619837.png",
          category_id: 5,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712963306006.png",
          category_id: 6,
        },
        {
          image: "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712963367393.png",
          category_id: 7,
        },
        {
          image: "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712963451749.png",
          category_id: 8,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712963618389.png",
          category_id: 9,
        },
        {
          image: "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712963661601.png",
          category_id: 10,
        },
        {
          image: "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712963827305.png",
          category_id: 11,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712963902629.png",
          category_id: 12,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712963977604.png",
          category_id: 13,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712964072285.png",
          category_id: 14,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712964129508.png",
          category_id: 15,
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
