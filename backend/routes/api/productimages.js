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
  const productImages = await ProductImage.findAll();
  return res.json(productImages);
});

router.post("/:id", singleMulterUpload("image"), async (req, res) => {
  const user = { req };
  const productImageUrl = await singlePublicFileUpload(req.file);
  const productImage = await ProductImage.create({
    image: productImageUrl,
    product_id: req.params.id,
  });
  return res.json(productImage);
});

module.exports = router;
