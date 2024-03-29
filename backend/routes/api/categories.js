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

//get all categories

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  return res.json(categories);
});

//post a category
// to do validations require auth

router.post("/new", async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  const category = await Category.create({
    name,
  });
  return res.status(201).json(category);
});

// put category by id, shortciruits used to check if new data exists to change the data else retain original value
// to do validations check user is user, require auth

router.put("/:id", async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  const category = await Category.findByPk(req.params.id);

  category.name = name || category.name;
  await category.save();

  return res.json(category);
});

// delete category by id
// to do validations check user is user, require auth

router.delete("/:id", async (req, res) => {
  const { user } = req;

  const category = await Category.findByPk(req.params.id);
  await category.destroy();

  res.json({ message: `Deleted Category with id: ${req.params.id}` });
});

module.exports = router;
