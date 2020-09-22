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

module.exports = router;
