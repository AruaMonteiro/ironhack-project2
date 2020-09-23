const express = require("express");
const { deserializeUser } = require("passport");
const router = express.Router();
const User = require("../models/User.model");

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
  console.log("SESSION => ", req.user);

  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }
  return res.render("profile", req.user);
});

router.post("/profile", async (req, res) => {
  console.log(req.body);
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
