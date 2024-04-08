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

const { validateShop } = require("../../utils/validation");
// get all shops, includes for eager loads
// to do validations, (do I need them for this route?)
router.get("/", async (req, res) => {
  const shops = await Shop.findAll({
    include: [
      { model: Category },
      {
        model: Product,
        include: [
          { model: Category },
          { model: Review },
          { model: ProductImage },
        ],
      },
      { model: ShopImage },
      { model: Review, include: { model: User } },
      { model: User },
    ],
  });
  return res.json(shops);
});

// post a shop
// to do validations, require auth
router.post("/new", [requireAuth, validateShop], async (req, res) => {
  const { user } = req;
  const { name, about, policies, items, featured, category_id } = req.body;

  const shop = await Shop.create({
    name,
    about,
    policies,
    category_id,
    user_id: user.id,
  });
  res.status(201).json(shop);
});

// put a shop by id, shortcircuit or statements used to take in new data if exists or (||) retain original value
// to do validations check user is user, require auth
router.put("/:id", [requireAuth, validateShop], async (req, res) => {
  const { user } = req;
  const { name, about, policies, items, featured, category_id } = req.body;
  const shop = await Shop.findByPk(req.params.id);

  if (!shop) return res.status(404).json({ message: "Shop Not Found" });
  if (shop.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  shop.name = name || shop.name;
  shop.about = about || shop.about;
  shop.policies = policies || shop.policies;
  shop.category_id = category_id || shop.category_id;

  await shop.save();
  res.json(shop);
});

// delete a shop by id
// to do validations check user is user, require auth
router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const shop = await Shop.findByPk(req.params.id);

  if (!shop) return res.status(404).json({ message: "Shop Not Found" });
  if (shop.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  await shop.destroy();
  res.json({ message: `Deleted Shop with id: ${req.params.id}` });
});

module.exports = router;
