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

router.post("/fetchblob", async (req, res) => {
  const user = { req };
  const { url } = req.body;
  console.log(url);
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
    console.log(blob);
    let response = await blobUpload(blob);
    console.log(response);
    return res.json({ message: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Image failed to be retrieved" });
  }
});

module.exports = router;
