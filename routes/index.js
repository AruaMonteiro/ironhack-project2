const express = require("express");
const router = express.Router();

// Import user model
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/marmitas", (req, res, next) => {
  const marmitas = [
    {
      name: "marmitas 1",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
    {
      name: "marmitas 2",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
    {
      name: "marmitas 3",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
    {
      name: "marmitas 4",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
    {
      name: "marmitas 5",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
    {
      name: "marmitas 6",
      category: "comida brasileira",
      image: "/images/marmita.jpg",
    },
  ];
  console.log(marmitas);
  res.render("marmitas", { marmitas });
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
