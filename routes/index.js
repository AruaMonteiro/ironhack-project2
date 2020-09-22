const express = require("express");
const { deserializeUser } = require("passport");
const router = express.Router();
const User = require("../models/User.model");

// Import user model
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
  // const marmitas = [
  //   {
  //     name: "marmitas 1",
  //     category: "comida brasileira, japonesa, italiana",
  //     image: "/images/marmita.jpg",
  //   },
  //   {
  //     name: "marmitas 2",
  //     category: "comida brasileira",
  //     image: "/images/marmita.jpg",
  //   },
  //   {
  //     name: "marmitas 3",
  //     category: "comida brasileira",
  //     image: "/images/marmita.jpg",
  //   },
  //   {
  //     name: "marmitas 4",
  //     category: "comida brasileira",
  //     image: "/images/marmita.jpg",
  //   },
  //   {
  //     name: "marmitas 5",
  //     category: "comida brasileira",
  //     image: "/images/marmita.jpg",
  //   },
  //   {
  //     name: "marmitas 6",
  //     category: "comida brasileira",
  //     image: "/images/marmita.jpg",
  //   },
  // ];
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
    const result = await User.updateOne({ _id: req.user.id }, { $set: req.body });
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
