const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

// import models
const {
  User,
  Category,
  CategoryImage,
  Product,
  ProductImage,
  Review,
  Shop,
  ShopImage,
} = require("../../db/models");

// get all shops, includes for eager loads
// to do validations, (do I need them for this route?)
router.get("/", async (req, res) => {
  const shops = await Shop.findAll({
    include: [
      { model: Category },
      { model: Product },
      { model: ShopImage },
      { model: Review },
      { model: User },
    ],
  });
  return res.json(shops);
});

// post a shop
// to do validations, require auth
router.post("/new", async (req, res) => {
  const { user } = req;
  const { name, about, policies, items, featured, category_id } = req.body;

  const shop = await Shop.create({
    name,
    about,
    policies,
    items,
    featured,
    category_id,
    user_id: user.id,
  });
  res.status(201).json(shop);
});

// put a shop by id, shortcircuit or statements used to take in new data if exists or (||) retain original value
// to do validations check user is user, require auth
router.put("/:id", async (req, res) => {
  const { user } = req;
  const { name, about, policies, items, featured, category_id } = req.body;
  const shop = await Shop.findByPk(req.params.id);

  shop.name = name || shop.name;
  shop.about = about || shop.about;
  shop.policies = policies || shop.policies;
  shop.items = items || shop.items;
  shop.featured = featured || shop.featured;
  shop.category_id = category_id || shop.category_id;

  await shop.save();
  res.json(shop);
});

// delete a shop by id
// to do validations check user is user, require auth
router.delete("/:id", async (req, res) => {
  const { user } = req;
  const shop = await Shop.findByPk(req.params.id);
  await shop.destoy();
  res.json({ message: `Deleted Shop with id: ${req.params.id}` });
});

module.exports = router;
