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

const { validateCategory } = require("../../utils/validation");
//get all categories

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: { model: CategoryImage },
  });
  return res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [
      { model: CategoryImage },
      {
        model: Product,
        where: { category_id: req.params.id },
        include: [{ model: Review }, { model: ProductImage }, { model: Shop }],
      },
    ],
  });
  res.json(category);
});

//post a category
// to do validations require auth

router.post("/new", [requireAuth, validateCategory], async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  const category = await Category.create({
    name,
    user_id: user.id,
  });
  return res.status(201).json(category);
});

// put category by id, shortciruits used to check if new data exists to change the data else retain original value
// to do validations check user is user, require auth

router.put("/:id", [requireAuth, validateCategory], async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  const category = await Category.findByPk(req.params.id);

  if (!category) return res.status(404).json({ message: "Category Not Found" });
  if (category.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  category.name = name || category.name;
  await category.save();

  return res.json(category);
});

// delete category by id
// to do validations check user is user, require auth

router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;

  const category = await Category.findByPk(req.params.id);

  if (!category) return res.status(404).json({ message: "Category Not Found" });
  if (category.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  await category.destroy();

  res.json({ message: `Deleted Category with id: ${req.params.id}` });
});

module.exports = router;
