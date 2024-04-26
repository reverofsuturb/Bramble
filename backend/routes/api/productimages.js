const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  blobUpload,
} = require("../../awsS3");
require("dotenv");
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

const { OPEN_API_KEY } = process.env;

router.get("/api-key", async (req, res) => {
  res.json({ key: OPEN_API_KEY });
});

router.post("/fetchblob", [requireAuth], async (req, res) => {
  const user = { req };
  const { url, id } = req.body;

  const blobHelper = async (url) => {
    try {
      let image = await fetch(url);
      let blob = await image.blob();
      return blob;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  try {
    let blob = await blobHelper(url);

    let response = await blobUpload(blob);

    let productImage = await ProductImage.create({
      image: response,
      product_id: id,
    });
    return res.json(productImage);
  } catch (err) {
    return res.status(500).json({ message: "Image failed to be retrieved" });
  }
});

router.post(
  "/:id",
  [requireAuth, singleMulterUpload("image")],
  async (req, res) => {
    const user = { req };
    const productImageUrl = await singlePublicFileUpload(req.file);
    const productImage = await ProductImage.create({
      image: productImageUrl,
      product_id: req.params.id,
    });
    return res.json(productImage);
  }
);

module.exports = router;
