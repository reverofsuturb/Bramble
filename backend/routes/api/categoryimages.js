const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

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

router.get("/", async (req, res) => {
  const categoryImages = await CategoryImage.findAll();
  return res.json(categoryImages);
});

router.post("/:id", singleMulterUpload("image"), async (req, res) => {
  const user = { req };
  const categoryImageUrl = await singlePublicFileUpload(req.file);
  const categoryImage = await CategoryImage.create({
    image: categoryImageUrl,
    category_id: req.params.id,
  });
  return res.json(categoryImage);
});

module.exports = router;
