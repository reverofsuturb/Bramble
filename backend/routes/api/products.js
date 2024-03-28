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

// get all products, includes for eager loads
// to do validations, (do I need them for this route?)
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

// post a product
// to do validations, require auth
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

// put a product by id, shortciruits used to check if new data exists to change the data else retain original value
// to do validations check user is user, require auth
router.put("/:id", async (req, res) => {
  const { user } = req;
  const { name, price, description, details, shipping, category_id } = req.body;
  const product = await Product.findByPk(req.params.id);

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.details = details || product.details;
  product.shipping = shipping || product.shipping;
  product.category_id = category_id || product.category_id;
  await product.save();
  res.json(product);
});

// delete a product by id
// to do validations check user is user, require auth
router.delete("/:id", async (req, res) => {
  const { user } = req;
  const product = await Product.findByPk(req.params.id);
  await product.destroy();
  res.json({ message: `Deleted Product with id: ${req.params.id}` });
});

module.exports = router;
