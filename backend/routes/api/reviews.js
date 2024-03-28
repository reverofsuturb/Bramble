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

// get all reviews associated with id
// need to decide if this is dynamically implementable this way as not really following rest convention
router.get("/:id", async (req, res) => {
  const { product, shop } = req.params;

  if (product) {
    const reviews = await Review.findAll({
      where: { product_id: req.params.id },
    });
  } else if (shop) {
    const reviews = await Review.findAll({
      where: { shop_id: req.params.id },
    });
  }
  return res.json(reviews);
});

//post a review
//to do validations, require auth
router.post("/new", async (req, res) => {
  const { user } = req;
  const { body, rating, product_id, shop_id } = req.body;

  const review = await Review.create({
    body,
    rating,
    user_id: user.id,
    product_id,
    shop_id,
  });

  res.status(201).json(review);
});

//put a review by review id
//to do validations, check user if user, require auth
router.put("/:id", async (req, res) => {
  const { user } = req;
  const { body, rating } = req.body;

  const review = await Review.findByPk(req.params.id);

  review.body = body || review.body;
  review.rating = rating || review.rating;
  await review.save();
  res.json(review);
});

//put a review by review id
//to do validations, check user if user, require auth
router.delete("/:id", async (req, res) => {
  const { user } = req;
  const review = await Review.findByPk(req.params.id);
  await review.destroy();
  res.json({ message: `Deleted Review with id: ${req.params.id}` });
});

module.exports = router;
