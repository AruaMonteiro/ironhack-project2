const express = require("express");
const { deserializeUser } = require("passport");
const router = express.Router();
const User = require("../models/User.model");
const Dish = require("../models/Dish.model");

const fileUploader = require("../configs/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/marmitas", async (req, res, next) => {
  try {
    const result = await User.find();
    console.log(result);
    res.render("marmitas", { result });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }
  return res.render("profile", req.user);
});

router.post("/profile", fileUploader.single("imageUrl"), async (req, res) => {
  let image;
  if (req.file) {
    image = req.file.url;
  } else {
    image = req.body.existingImage;
  }
  console.log(req.file);
  try {
    const result = await User.updateOne(
      { _id: req.user.id },
      { $set: req.body, image }
    );
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

router.get("/detalhes/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    const pratos = await Dish.find({ userId: req.params.id });
    res.render("detalhes.hbs", { result, pratos });
  } catch (error) {
    console.error(error);
  }
});

//search bar

router.post("/search", async (req, res, next) => {
  const search = req.body.searchInput;
  const regex = new RegExp(`.*${search}.*`, "i");
  console.log(regex);
  try {
    const result = await User.find({ category: regex });
    console.log(result);
    res.render("marmitas", { result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
