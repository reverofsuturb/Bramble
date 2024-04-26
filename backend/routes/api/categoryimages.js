const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  blobUpload,
} = require("../../awsS3");

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

    let categoryImage = await CategoryImage.create({
      image: response,
      category_id: id,
    });
    return res.json(categoryImage);
  } catch (err) {
    return res.status(500).json({ message: "Image failed to be retrieved" });
  }
});

router.post(
  "/:id",
  [requireAuth, singleMulterUpload("image")],
  async (req, res) => {
    const user = { req };
    const categoryImageUrl = await singlePublicFileUpload(req.file);
    const categoryImage = await CategoryImage.create({
      image: categoryImageUrl,
      category_id: req.params.id,
    });
    return res.json(categoryImage);
  }
);

module.exports = router;
