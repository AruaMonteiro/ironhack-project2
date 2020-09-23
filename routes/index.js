const express = require("express");
const { deserializeUser } = require("passport");
const router = express.Router();
const User = require("../models/User.model");

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
      { $set: req.body }
    );
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

router.get("/detalhes/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.render("detalhes.hbs", result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
