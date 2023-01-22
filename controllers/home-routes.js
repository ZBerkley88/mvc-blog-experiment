const router = require("express").Router();
require("dotenv").config();

// homepage route
router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard page route
router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("login");
});

// signup page route
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("signup");
});


module.exports = router;
