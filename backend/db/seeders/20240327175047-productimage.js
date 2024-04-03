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
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712094842320.png",
          product_id: 1,
        },
        {
          image: "https://bramble-bucket.s3.amazonaws.com/1712103141293.png",
          product_id: 2,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/cornedbeefcomp.png",
          product_id: 3,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-0QwkxU14llJDyX9Mg8xhgDd3.png",
          product_id: 4,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-43bykxATKwIuR7uUoXNsHDk5.png",
          product_id: 5,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-6SjChuUEQt1PJMQD6RlreY9t.png",
          product_id: 6,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-7TEllz3qWN8LclIWdKcwInnN.png",
          product_id: 7,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-8V47elW1gWXyLb37X8zUFbNe.png",
          product_id: 8,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-95z96Wqe7Ew6TNjNB5y2zmJO.png",
          product_id: 9,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-ACH43pTjNZrp4yb3NxeEEsjI.png",
          product_id: 10,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-C7mLPqD07TkyuDtCrBwibuq3.png",
          product_id: 11,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-CZ75FdCfTq61zaPa8hlhNLQH.png",
          product_id: 12,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-DXLGhLaWcBWwlJ3eHUbMvXEf.png",
          product_id: 13,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-EhaBFTXGGZMQ7f0Ma39gFg3N.png",
          product_id: 14,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-KMyAiZx7cN6wdDYVD6mql5Ll.png",
          product_id: 15,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-KbSlIoZsvJOZTgyYVHoV5tHS.png",
          product_id: 16,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-LhOZNX0l5AoaUnORZveFhWeF.png",
          product_id: 17,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-Nxb0Hn8Um1TnEv88bHLuVXKx.png",
          product_id: 18,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-ONhVf2CsWPqnqjP7Kdwfl9Eg.png",
          product_id: 19,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-PIsY239Tm89cuck0SKwcclgw.png",
          product_id: 20,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-Pwx0lzJbxn6Dn2SzBpeARjfM.png",
          product_id: 21,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-QbSYlLjtOyTW2fGYKGtad404.png",
          product_id: 22,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-U0UKPNBl3OBsQBCNig86IIZf.png",
          product_id: 23,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-WBLv6taMJnJoT3lReSItAT61.png",
          product_id: 24,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-WpjUN7ON9HxNW99qTMVQ34Bq.png",
          product_id: 25,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-X0Wp1ICjsaPso7s1SzzbDkCp.png",
          product_id: 26,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-XmI1MrM91EcfZBL84UEmJKvd.png",
          product_id: 27,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-ZdaRfedchwutalIWoK9oaXJ9.png",
          product_id: 28,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-bLl1izCy2R9KZTdI67vz1msM.png",
          product_id: 29,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-bmBHsoDH1cdlYh9tox26dkte.png",
          product_id: 30,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-f0mSX2riWn8TIsG3RYduRQ3S.png",
          product_id: 31,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-g17AQ7Ve9qbednAkf8aVQrru.png",
          product_id: 32,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-g7ueJalbeINHUAgf7ZMrwITF.png",
          product_id: 33,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-iE6YIA8UDbKxJf1Nn6HbPI0E.png",
          product_id: 34,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-lLQM2Dgnvz6tEyiAPkSXujcb.png",
          product_id: 35,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-oOSSVP7tcRdMGVUYTgUu4wzW.png",
          product_id: 36,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-rQmv1yYhgRiZLfk231hwP3Na.png",
          product_id: 37,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-rUP0aVOkPFMNe4vKxh5ZCUm3.png",
          product_id: 38,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-snBusk6yRjDMgUjNHK8Mh2kn.png",
          product_id: 39,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-usGF6H6mNmEyA3YSJQNXrQlv.png",
          product_id: 40,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-vinhGbAFaX0R9V6LWR2fipN6.png",
          product_id: 41,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-wDMfk4heOo5Vxjv0PpMECmjD.png",
          product_id: 42,
        },
        {
          image:
            "https://bramble-bucket.s3.us-east-2.amazonaws.com/img-xuOyah7MQuRZNcChW66kojE1.png",
          product_id: 43,
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
