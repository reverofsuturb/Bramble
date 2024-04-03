"use strict";
const { Shop } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Shop.bulkCreate([
      {
        name: "Galactic Emporium",
        about:
          "A store known as the 'Galactic Emporium'. The intergalactic nature of the store is reflected in its offerings, with a wide variety of items that represent everything in the universe. Aliens of different kinds roam, exploring the diverse cosmic merchandise. The store's futuristic storefront has a cosmic theme with glowing stars, nebulae, and distant galaxies portrayed on its external appearance.",
        policies: "none",
        category_id: 1,
        user_id: 1,
      },
      {
        name: "Wiggling Central",
        about:
          "Welcome to 'Wiggling Central', the shop is bustling and lively. It possesses a charming aesthetic that welcomes all! Do you need fitness posters, dance shoes, and other movement-related gear? Shoppers, both beginners and professionals in various movement arts, are seen browsing through the array of goods that cater specifically to their passion. The lively atmosphere represents the spirit of general movement enthusiasts. It's a one-stop destination for fans of any music, dance, fitness or any kinetic activity.",
        policies: "ship it all back",
        category_id: 2,
        user_id: 1,
      },
      {
        name: "AntiShop",
        about:
          "Get your needs met at the 'AntiShop'. Spotlessly clean and decidedly out of the ordinary, this retail outlet sells items that are not found anywhere in the universe. Offbeat objects line its shelves-plasma globes filled with constellations, knick-knacks that shift in and out of dimensions, accessories that pause time. Every item stocked here defies logic and seems to challenge the very fabric of reality. The shop's ethereal ambiance, surreal merchandise, and borderline mystical aura are nothing short of enchanting.",
        policies: "we'd have them if they existed",
        category_id: 3,
        user_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Shops";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["%a%"] },
    });
  },
};
