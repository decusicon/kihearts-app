var express = require("express");
var passport = require("passport");
var router = express.Router();

// GET -- fetch page.
router.get("/", (req, res) => {
  res.render("pages/auth/login", { title: "Login" });
});

// GET -- login a user.
router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    successFlash: "Welcome to your dashboard!",
    failureRedirect: "/auth/login",
    failureFlash: "Sorry! Invalid username or password",
  })(req, res, next);
});

module.exports = router;
