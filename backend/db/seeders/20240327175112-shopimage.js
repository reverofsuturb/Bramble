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
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-LzLLUYrSV5TS6CG4TWRz6suw.png",
          shop_id: 1,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-xtIBnpCpQPT7rBVa3iTWkJvR.png",
          shop_id: 2,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-lsHEuUPLEdzctaF1P22iznSE.png",
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
