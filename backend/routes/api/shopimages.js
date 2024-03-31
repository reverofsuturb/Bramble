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
  const shopImages = await ShopImage.findAll();
  return res.json(shopImages);
});

router.post("/:id", singleMulterUpload("image"), async (req, res) => {
  const user = { req };
  const shopImageUrl = await singlePublicFileUpload(req.file);
  const shopImage = await ShopImage.create({
    image: shopImageUrl,
    shop_id: req.params.id,
  });
  return res.json(shopImage);
});

module.exports = router;
