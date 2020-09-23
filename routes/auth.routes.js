const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const passport = require("passport");

// Define number of Salt rounds for encrypt the password
const saltRounds = 10;

// Import user model
const User = require("../models/User.model");

// GET signUp form
router.get("/signup", (req, res) => res.render("auth/signup"));

// POST Create User with signup form information
router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  const category = req.body.category.split(",");

  if (!name || !email || !password) {
    res.render("auth/signup", { errorMessage: "Nome, email e senha são obrigatórios. Por favor preencha esses campos." });
    return;
  }

  try {
    //Generate hash with salt and password provide by the user
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Hashed password => ", hashedPassword);

    // Create user in db
    const result = await User.create({ ...req.body, passwordHash: hashedPassword, category });

    // Redirect to login form
    res.redirect("/login");
    console.log(result);
  } catch (err) {
    console.error(err);
    // Error message for Mongoose errors
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: err.message });
    } else if (err.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage: "Email is already used.",
      });
    }
  }
});

// GET Login Form
router.get("/login", (req, res) => res.render("auth/login"));

// POST Login if user and password matches
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/list-dishes",
    failureRedirect: "/login",
  })
);

module.exports = router;
