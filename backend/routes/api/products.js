const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

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

router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Category },
      { model: Shop },
      { model: ProductImage },
      { model: Review },
      { model: User },
    ],
  });
  return res.json(products);
});

router.post("/new", async (req, res) => {
  const { user } = req;
  const { name, price, description, details, shipping, category_id } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    details,
    shipping,
    category_id,
    user_id: user.id,
  });

  res.json(product);
});

router.put("/:id", async (req, res) => {
  const { user } = req;
  const { name, price, description, details, shipping, category_id } = req.body;
  const product = await Product.findByPk(req.params.id);

  name ? (product.name = name) : (product.name = product.name);
  price ? (product.price = price) : (product.price = product.price);
  description
    ? (product.description = description)
    : (product.description = product.description),
    details ? (product.details = details) : (product.details = product.details),
    shipping
      ? (product.shipping = shipping)
      : (product.shipping = product.shipping),
    category_id
      ? (product.category_id = category_id)
      : (product.category_id = product.category_id),
    await product.save();
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const { user } = req;
  const product = await Product.findByPk(req.params.id);
  await product.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;
