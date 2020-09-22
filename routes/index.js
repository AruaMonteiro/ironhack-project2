const express = require("express");
const router = express.Router();

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

module.exports = router;
