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

const { validateProduct } = require("../../utils/validation");

// get all products, includes for eager loads
// to do validations, (do I need them for this route?)
router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Category },
      { model: Shop },
      { model: ProductImage },
      { model: Review, include: { model: User } },
      { model: User },
    ],
  });
  return res.json(products);
});

// post a product
// to do validations, require auth
router.post("/new", [requireAuth, validateProduct], async (req, res) => {
  const { user } = req;
  const {
    name,
    price,
    description,
    details,
    shipping,
    featured,
    shop_id,
    category_id,
  } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    details,
    shipping,
    featured,
    shop_id,
    category_id,
    user_id: user.id,
  });

  res.json(product);
});

// put a product by id, shortciruits used to check if new data exists to change the data else retain original value
// to do validations check user is user, require auth
router.put("/:id", [requireAuth, validateProduct], async (req, res) => {
  const { user } = req;
  const {
    name,
    price,
    description,
    details,
    featured,
    shop_id,
    shipping,
    category_id,
  } = req.body;
  const product = await Product.findByPk(req.params.id);

  if (!product) return res.status(404).json({ message: "Product Not Found" });
  if (product.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.details = details || product.details;
  product.shipping = shipping || product.shipping;
  product.featured = featured || product.featured;
  product.shop_id = shop_id || product.shop_id;
  product.category_id = category_id || product.category_id;
  await product.save();
  res.json(product);
});

// delete a product by id
// to do validations check user is user, require auth
router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Product Not Found" });
  if (product.user_id != user.id)
    return res.status(403).json({ message: "Forbidden" });

  await product.destroy();
  res.json({ message: `Deleted Product with id: ${req.params.id}` });
});

module.exports = router;
