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
  const shopImages = await ShopImage.findAll();
  return res.json(shopImages);
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
    console.log(blob);
    let response = await blobUpload(blob);
    console.log(response);
    let shopImage = await ShopImage.create({
      image: response,
      shop_id: id,
    });
    return res.json(shopImage);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Image failed to be retrieved" });
  }
});

router.post(
  "/:id",
  [requireAuth, singleMulterUpload("image")],
  async (req, res) => {
    const user = { req };
    const shopImageUrl = await singlePublicFileUpload(req.file);
    const shopImage = await ShopImage.create({
      image: shopImageUrl,
      shop_id: req.params.id,
    });
    return res.json(shopImage);
  }
);

module.exports = router;
