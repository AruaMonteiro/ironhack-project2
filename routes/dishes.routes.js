const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Dish = require("../models/Dish.model");

const fileUploader = require("../configs/cloudinary.config");

router.get("/list-dishes", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }

  const user = req.user;
  const result = await Dish.find({ userId: req.user._id });
  console.log(result);
  return res.render("list-dishes", { user, result });
});

router.get("/add-dish", (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }
  return res.render("add-dish", req.user);
});

router.post("/add-dish", fileUploader.single("imageUrl"), async (req, res) => {
  let image;
  if (req.file) {
    image = req.file.url;
  } else {
    image =
      "https://res.cloudinary.com/dv4g4kubs/image/upload/v1600899936/photos/default-marmita.jpg";
  }

  try {
    // Create dish in db
    const result = await Dish.create({
      ...req.body,
      image,
      userId: req.user._id,
    });

    // Redirect to login form
    res.redirect("/list-dishes");
  } catch (err) {
    console.error(err);
  }
});

router.get("/delete-dish/:id", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }
  try {
    const result = await Dish.deleteOne({ _id: req.params.id });
    res.redirect("/list-dishes");
  } catch (err) {
    console.error(err);
  }
});

router.get("/edit-dish/:id", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/login");
  }

  const user = req.user;
  try {
    const result = await Dish.findOne({ _id: req.params.id });
    res.render("edit-dish", { user, result });
  } catch (err) {
    console.error(err);
  }
});

router.post(
  "/edit-dish/:id",
  fileUploader.single("imageUrl"),
  async (req, res) => {
    let image;
    if (req.file) {
      image = req.file.url;
    } else {
      image = req.body.existingImage;
    }
    console.log(req.body);
    try {
      const result = await Dish.updateOne(
        { _id: req.params.id },
        { $set: req.body, image }
      );
      res.redirect("/list-dishes");
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
